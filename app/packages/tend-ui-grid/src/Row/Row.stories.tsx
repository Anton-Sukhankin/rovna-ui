import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { colors } from '@rovna-ui/tokens/samolet';

import { Col } from '../Col';
import { Row } from './Row';

const meta: Meta<typeof Row> = {
  title: 'Rovna UI/Grid/Row',
  component: Row,
};

export default meta;
type Story = StoryObj<typeof meta>;

const cellStyle: React.CSSProperties = {
  background: colors.blue50,
  border: `1px solid ${colors.blue200}`,
  padding: 12,
};

export const Default: Story = {
  render: args => (
    <Row {...args}>
      <Col span={8} style={cellStyle}>Первая колонка</Col>
      <Col span={8} style={cellStyle}>Вторая колонка</Col>
      <Col span={8} style={cellStyle}>Третья колонка</Col>
    </Row>
  ),
};

export const Gutter: Story = {
  render: args => (
    <Row {...args} gutter={[16, 16]}>
      <Col span={12}><div style={cellStyle}>Левая область</div></Col>
      <Col span={12}><div style={cellStyle}>Правая область</div></Col>
    </Row>
  ),
};

export const Alignment: Story = {
  render: args => (
    <Row {...args} align='middle' justify='space-between' style={{ minHeight: 96 }}>
      <Col><div style={cellStyle}>Короткий блок</div></Col>
      <Col><div style={{ ...cellStyle, minHeight: 72 }}>Высокий блок</div></Col>
    </Row>
  ),
};

export const LongText: Story = {
  render: args => (
    <Row {...args} gutter={[8, 8]}>
      <Col xs={24} md={12}>
        <div style={cellStyle}>Длинное содержимое переносится внутри адаптивной строки без потери читаемости.</div>
      </Col>
      <Col xs={24} md={12}>
        <div style={cellStyle}>На узком экране колонки располагаются последовательно.</div>
      </Col>
    </Row>
  ),
};
