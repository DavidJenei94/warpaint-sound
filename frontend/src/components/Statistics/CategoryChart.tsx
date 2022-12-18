import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import ChartContainer from './ChartContainer';
import { round } from '../../utils/general.utils';
import { CategoryCount } from '../../models/category.model';

interface CategoryChartProps {
  categoriesCountStats: CategoryCount[];
}

const CategoryChart = ({ categoriesCountStats }: CategoryChartProps) => {
  const numberOfSoundRecords: number = categoriesCountStats.reduce(
    (totalCategoryCount: number, stat: CategoryCount) =>
      totalCategoryCount + Number(stat.categoryCount),
    0
  );

  const data = {
    labels: categoriesCountStats.map((stat: CategoryCount) => stat.name),
    datasets: [
      {
        label: '# of Sound Records',
        data: categoriesCountStats.map((stat: CategoryCount) => stat.categoryCount),
        backgroundColor: [
          '#3ebd7d',
          '#fdce56',
          '#39a9f3',
          '#fa5e80',
          '#9764fd',
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <ChartContainer title="Categories">
      <Pie
        data={data}
        plugins={[ChartDataLabels]}
        options={{
          plugins: {
            legend: {
              display: false,
            },
            datalabels: {
              labels: {
                value: {
                  color: 'black',
                },
              },
              textAlign: 'center',
              formatter: (value, context) => {
                const percentage = (value / numberOfSoundRecords) * 100;
                if (percentage < 5) {
                  return '';
                }

                return `${context.chart.data.labels![context.dataIndex]}\n${
                  round(percentage, 1) + '%'
                }`;
              },
            },
          },
        }}
      />
    </ChartContainer>
  );
};

export default CategoryChart;
