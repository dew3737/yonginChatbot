import React from 'react';

import IconButton from '../components/atoms/Button/IconButton';

export default {
  title: 'Atoms/Button/IconButton',
  component: IconButton,
};

const Template = args => <IconButton {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  icon: 'ri-close-fill',
  styleDef: {},
  viewStatus: '',
};

export const dim = Template.bind({});
dim.args = {
  icon: 'ri-close-fill',
  styleDef: {},
  viewStatus: '_dim',
};
