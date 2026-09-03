import React from 'react';

import { Row } from './Row';
import { Col } from '../Col';
import { snapshotWithTheme } from '../../../tend-ui/src/tools/snapshotWithTheme';

describe('Row/Col', () => {
  it('renders correctly', () => {
    const snap = snapshotWithTheme(
      <>
        <Row>
          <Col span={24}>col</Col>
        </Row>
        <Row>
          <Col span={12}>col-12</Col>
          <Col span={12}>col-12</Col>
        </Row>
        <Row>
          <Col span={8}>col-8</Col>
          <Col span={8}>col-8</Col>
          <Col span={8}>col-8</Col>
        </Row>
        <Row>
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
          <Col span={6}>col-6</Col>
        </Row>
      </>,
    );

    expect(snap).toMatchSnapshot();
  });
});
