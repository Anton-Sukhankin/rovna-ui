import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { colors } from '@rovna-ui/tokens/samolet';

import { Row } from '../Row';
import { Col } from './Col';

const meta: Meta<typeof Col> = {
  title: 'Rovna UI/Grid/Col',
  component: Col,
};

export default meta;
type Story = StoryObj<typeof meta>;

const contentStyle: React.CSSProperties = {
  background: colors.green50,
  border: `1px solid ${colors.green200}`,
  padding: 12,
};

export const Default: Story = {
  render: args => (
    <Row gutter={8}>
      <Col {...args} span={12}><div style={contentStyle}>Колонка 12</div></Col>
      <Col span={12}><div style={contentStyle}>Колонка 12</div></Col>
    </Row>
  ),
};

export const Offset: Story = {
  render: args => (
    <Row>
      <Col {...args} span={8} offset={8}>
        <div style={contentStyle}>Колонка со смещением</div>
      </Col>
    </Row>
  ),
};

export const Responsive: Story = {
  render: args => (
    <Row gutter={[8, 8]}>
      <Col {...args} xs={24} sm={12} lg={6}><div style={contentStyle}>Первая</div></Col>
      <Col xs={24} sm={12} lg={6}><div style={contentStyle}>Вторая</div></Col>
      <Col xs={24} sm={12} lg={6}><div style={contentStyle}>Третья</div></Col>
      <Col xs={24} sm={12} lg={6}><div style={contentStyle}>Четвертая</div></Col>
    </Row>
  ),
};

export const LongText: Story = {
  render: args => (
    <Row>
      <Col {...args} span={24}>
        <div style={contentStyle}>Содержимое большой длины остается внутри границ колонки и переносится на новую строку.</div>
      </Col>
    </Row>
  ),
};
