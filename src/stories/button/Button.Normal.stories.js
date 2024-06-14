import React from 'react';
import NormalButton from 'components/atoms/Button/NormalButton';

export default {
  title: 'Atoms/Button/Normal',
  component: NormalButton,
};

const Template = args => <NormalButton {...args} />;

export const ButtonDefault = Template.bind({});

ButtonDefault.args = {
  label: 'normal',
  labelIcon: 'ri-home-3-line',
  styleDef: {},
  viewStatus: '',
};
