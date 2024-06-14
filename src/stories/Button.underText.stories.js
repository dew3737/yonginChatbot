import React from 'react';
import ButtonUnderText from '../components/atoms/Button/Button.underText';

export default {
  title: 'Atoms/Button/ButtonUnderText',
  component: ButtonUnderText,
};

const Template = args => <ButtonUnderText {...args} />;

export const ButtonDefault = Template.bind({});

ButtonDefault.args = {
  labelIcon: 'ri-home-3-line',
  styleDef: {},
  viewStatus: '',
};
