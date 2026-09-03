import { Any } from '@rovna-ui/types';
import { extract } from '@rovna-ui/utils';

import {
  ValidationResult,
  ValidationRule,
  Validator,
} from '@rovna-internal/form/core/interfaces';
import { max, min, pattern, required } from '@rovna-internal/form/validators';

import { toKey, toPath } from '../utils/path';

export class AsyncValidator {
  private results: Map<string, ValidationResult[]> = new Map();

  private rules: Map<string, ValidationRule[]> = new Map();

  constructor() {
    this.register = this.register.bind(this);
    this.validateField = this.validateField.bind(this);
    this.validateFields = this.validateFields.bind(this);
  }

  public register(name: string | string[], rules: ValidationRule[]) {
    const transformed = rules.reduce<ValidationRule[]>((prepared, rule) => {
      if (rule.validator) {
        prepared.push(rule);

        return prepared;
      }

      if (rule.required) {
        prepared.push({ ...rule, validator: required });

        return prepared;
      }

      if (rule.min) {
        prepared.push({ ...rule, validator: min });

        return prepared;
      }

      if (rule.max) {
        prepared.push({ ...rule, validator: max });

        return prepared;
      }

      if (rule.pattern) {
        prepared.push({ ...rule, validator: pattern });

        return prepared;
      }

      return prepared;
    }, []);

    this.rules.set(toKey(name), transformed);
  }

  /**
   * Запустить валидацию по ключу
   */
  public async validateField(
    name: string | string[],
    payload: Any,
  ): Promise<ValidationResult> {
    const key = toKey(name);
    const path = toPath(key);
    const rules = this.rules.get(key);

    const data: ValidationResult = { name: path, value: payload, status: 'success' };

    if (!rules) return data;

    const promises = rules.map(rule => {
      const fn = rule.validator as Validator;

      return fn(payload, rule).catch(() => {
        if (rule.warning) {
          const data: ValidationResult = {
            name: path,
            value: payload,
            status: 'warning',
            message: rule.message,
          };

          return Promise.resolve(data);
        }

        const data: ValidationResult = {
          name: path,
          value: payload,
          status: 'error',
          message: rule.message,
        };

        return Promise.reject(data);
      });
    });

    try {
      const result = await Promise.all(promises);
      const warnings = result.filter((v): v is ValidationResult => Boolean(v));
      if (warnings.length) {
        return warnings[0];
      }

      const data: ValidationResult = { name: path, value: payload, status: 'success' };

      return data;
    } catch (e) {
      const r = e as ValidationResult;
      const s = this.results.get(key);
      if (s) {
        s.push(r);
      } else {
        this.results.set(key, [r]);
      }
      throw r as ValidationResult;
    }
  }

  /**
   * Запустить валидацию всех полей
   */
  public async validateFields<State>(state: State): Promise<void> {
    const promises = Array.from(this.rules.entries())
      .map(([key, rules]) => {
        return rules.map(rule => {
          const path = key.split('.');
          const fn = rule.validator as Validator;
          const payload = extract(state, path);

          return fn(payload, rule).catch(() => {
            const data: ValidationResult = {
              name: path,
              value: payload,
              status: 'error',
              message: rule.message,
            };

            return Promise.reject(data);
          });
        });
      })
      .flat();

    const result = await Promise.allSettled(promises);
    const rejected = result.filter(r => r.status === 'rejected');

    if (rejected.length) {
      rejected.forEach(r => {
        const key = toKey(r.reason.path);
        const s = this.results.get(key);
        if (s) {
          s.push(r.reason);
        } else {
          this.results.set(key, [r.reason]);
        }
      });

      return Promise.reject(rejected);
    }

    return Promise.resolve();
  }

  public getFieldErrors(name: string | string[]) {
    const result = this.results.get(toKey(name));
    if (result) return result;

    return null;
  }

  public getFieldsErrors() {
    return Array.from(this.results.entries())
      .map(([, results]) => results)
      .flat();
  }
}
