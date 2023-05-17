import Text from '@Atom/Text';
import useTheme from '@Hooks/useTheme';
import React from 'react';
import {View, ViewProps} from 'react-native';
import {PieChart} from 'react-native-svg-charts';

interface IChartData {
  value: number;
  color?: string;
}

interface IDonutChart extends ViewProps {
  data: Array<IChartData>;
  size?: number;
  value: string;
}

const DonutChart = ({data, value, size = 200, ...props}: IDonutChart) => {
  const {Layout, Gutters, Common, Colors} = useTheme();

  const randomColor = () =>
    ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(
      0,
      7,
    );

  const pieData = data
    .filter(o => o.value > 0)
    .map((o, index) => ({
      value: o.value,
      svg: {
        fill: o.color || randomColor(),
        onPress: () => console.log('press', index),
      },
      key: `pie-${index}`,
      arc: {cornerRadius: '10%'},
    }));

  return (
    <View
      style={[
        Common.backgroundLayout,
        Layout.round,
        {
          width: size + size / 25,
          height: size + size / 25,
          padding: size / 25,
        },
      ]}
      {...props}>
      <PieChart
        style={{height: size}}
        data={pieData}
        outerRadius={'100%'}
        innerRadius={'60%'}
      />
      <View
        style={[
          Layout.center,
          {
            position: 'absolute',
            width: size + size / 25,
            height: size + size / 25,
          },
        ]}>
        <Text variant="semibold" color={Colors.primary[500]}>
          {value}
        </Text>
      </View>
    </View>
  );
};
export default DonutChart;
