import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { INITIAL_VIEWPORTS } from 'storybook/viewport';
import { BrowserRouter } from 'react-router-dom';
import { Toast } from '@rovna-ui/components/primitives';
import { argTypes } from '@rovna-ui/tools';

import docs from './docs.json';
import { Header } from './Header';
/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import * as DefaultCode from './__code__/DefaultCode.raw.tsx?raw';
import { props as defaultProps } from './__code__/DefaultCode.raw';
/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import * as ExtraCode from './__code__/ExtraCode.raw.tsx?raw';
import { props as extraProps } from './__code__/ExtraCode.raw';
/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import * as BurgerCode from './__code__/BurgerCode.raw.tsx?raw';
import { props as burgerProps } from './__code__/BurgerCode.raw';
/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import * as NotAuthenticatedCode from './__code__/NotAuthenticated.raw.tsx?raw';
import { props as notAuthenticatedProps } from './__code__/NotAuthenticated.raw';
/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import * as StandCode from './__code__/StandCode.raw.tsx?raw';
import {
  Template as StandCodeTemplate,
  props as standProps,
} from './__code__/StandCode.raw';
/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import * as ProjectCode from './__code__/ProjectCode.raw.tsx?raw';
import { props as projectProps } from './__code__/ProjectCode.raw';
/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import * as TenantLogoCode from './__code__/TenantLogoCode.raw.tsx?raw';
import { props as tenantLogoProps } from './__code__/TenantLogoCode.raw';
/* eslint-enable @typescript-eslint/ban-ts-comment */
/* eslint-enable import/no-unresolved */

Toast.init();

const meta: Meta<typeof Header> = {
  title: 'Rovna UI/Header/Header',
  component: Header,
  argTypes: argTypes(docs),
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
  },
  decorators: [
    Story => (
      <BrowserRouter>
        <Toast.Styles />
        <Story />
      </BrowserRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: DefaultCode.default,
      },
    },
  },
  args: defaultProps,
};

export const Burger: Story = {
  parameters: {
    docs: {
      source: {
        code: BurgerCode.default,
      },
    },
  },
  args: burgerProps,
};

export const Stand: Story = {
  parameters: {
    docs: {
      source: {
        code: StandCode.default,
      },
    },
  },
  args: standProps,
  render: StandCodeTemplate,
};

export const NotAuthenticated: Story = {
  parameters: {
    docs: {
      source: {
        code: NotAuthenticatedCode.default,
      },
    },
  },
  args: notAuthenticatedProps,
};

export const Project: Story = {
  parameters: {
    docs: {
      source: {
        code: ProjectCode.default,
      },
    },
  },
  args: projectProps,
};

export const Extra: Story = {
  parameters: {
    docs: {
      source: {
        code: ExtraCode.default,
      },
    },
  },
  args: extraProps,
};

export const TenantLogo: Story = {
  parameters: {
    docs: {
      source: {
        code: TenantLogoCode.default,
      },
    },
  },
  args: tenantLogoProps,
};

export const Mobile: Story = {
  parameters: {
    docs: {
      source: {
        code: DefaultCode.default,
      },
    },
  },

  args: defaultProps,

  globals: {
    viewport: {
      value: 'iphone6',
      isRotated: false,
    },
  },
};
