import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { colors } from '@rovna-ui/tokens/samolet';

import { Row } from './Row';
import { Col } from '../Col';

const meta: Meta<typeof Row> = {
  title: 'Rovna UI/Grid/Grid',
  component: Row,
};

export default meta;
type Story = StoryObj<typeof meta>;

const style = { padding: '16px', background: colors.blue50 };

export const Example1: Story = {
  render: _args => {
    return (
      <Row>
        <Col style={style} span={24}>
          col
        </Col>
      </Row>
    );
  },
};

export const Example2: Story = {
  render: _args => {
    return (
      <Row>
        <Col style={style} span={12}>
          col-12
        </Col>
        <Col style={style} span={12}>
          col-12
        </Col>
      </Row>
    );
  },
};

export const Example3: Story = {
  render: _args => {
    return (
      <Row>
        <Col style={style} span={8}>
          col-8
        </Col>
        <Col style={style} span={8}>
          col-8
        </Col>
        <Col style={style} span={8}>
          col-8
        </Col>
      </Row>
    );
  },
};

export const Example4: Story = {
  render: _args => {
    return (
      <Row>
        <Col style={style} span={6}>
          col-6
        </Col>
        <Col style={style} span={6}>
          col-6
        </Col>
        <Col style={style} span={6}>
          col-6
        </Col>
        <Col style={style} span={6}>
          col-6
        </Col>
      </Row>
    );
  },
};

export const Horizontal: Story = {
  render: _args => {
    return (
      <Row gutter={16}>
        <Col span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col span={6}>
          <div style={style}>col-6</div>
        </Col>
      </Row>
    );
  },
};

export const Responsive: Story = {
  render: _args => {
    return (
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col span={6}>
          <div style={style}>col-6</div>
        </Col>
        <Col span={6}>
          <div style={style}>col-6</div>
        </Col>
      </Row>
    );
  },
};

export const Offset: Story = {
  render: _args => {
    return (
      <>
        <Row>
          <Col style={style} span={8}>
            col-8
          </Col>
          <Col style={style} span={8} offset={8}>
            col-8
          </Col>
        </Row>
        <Row>
          <Col style={style} span={6} offset={6}>
            col-6 col-offset-6
          </Col>
          <Col style={style} span={6} offset={6}>
            col-6 col-offset-6
          </Col>
        </Row>
        <Row>
          <Col style={style} span={12} offset={6}>
            col-12 col-offset-6
          </Col>
        </Row>
      </>
    );
  },
};
