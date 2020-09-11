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
    SensorValue: 9876543210
  }
];

export const negativeTestData = [
  {
    HardwareId: 'TEST_TEST_1',
    SensorValue: '6'
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
    SensorValue: 777
  },
  {
    HardwareId: undefined,
    SensorValue: 888
  },
  {
    HardwareId: 666,
    SensorValue: 6
  }
];

export const equalTestData = [
  {
    HardwareId: 'TEST_TEST_1',
    SensorValue: 20
  },
  {
    HardwareId: 'TEST_TEST_1',
    SensorValue: 30
  },{
    HardwareId: 'TEST_TEST_2',
    SensorValue: -2
  },
  {
    HardwareId: 'TEST_TEST_2',
    SensorValue: -5
  },
  {
    HardwareId: 'TEST_TEST_3',
    SensorValue: -5
  },
  {
    HardwareId: 'TEST_TEST_4',
    SensorValue: -5
  }

];
