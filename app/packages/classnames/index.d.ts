declare namespace classNames {
  type ClassValue = string | number | null | false | undefined | ClassDictionary | ClassArray;

  interface ClassDictionary {
    [id: string]: unknown;
  }

  interface ClassArray extends Array<ClassValue> {}
}

declare function classNames(...classes: classNames.ClassValue[]): string;

export = classNames;
