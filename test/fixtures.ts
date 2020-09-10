export const positiveTestData = [
  {
    HardwareId: 'TEST_TEST_1',
    SensorValue: 20
  },
  {
    HardwareId: 'TEST_TEST_2',
    SensorValue: -1
  },{
    HardwareId: 'TEST_TEST_3',
    SensorValue: 0
  },{
    HardwareId: 'TEST_TEST_4',
    SensorValue: 12.3
  },{
    HardwareId: 'TEST_TEST_5',
    SensorValue: 2.3e-5
  }
];

export const negativeTestData = [
  {
    HardwareId: 'TEST_TEST_1',
    SensorValue: 'd'
  },
  {
    HardwareId: 'TEST_TEST_2',
    SensorValue: null
  },{
    HardwareId: 'TEST_TEST_3',
    SensorValue: undefined
  },
  {
    HardwareId: null,
    SensorValue: 4
  },
  {
    HardwareId: undefined,
    SensorValue: 5
  },
  {
    HardwareId: 666,
    SensorValue: 6
  }
];
