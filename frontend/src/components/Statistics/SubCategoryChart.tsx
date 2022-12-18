import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import ChartContainer from './ChartContainer';
import { round } from '../../utils/general.utils';
import { SubCategoryCount } from '../../models/category.model';

interface CategoryChartProps {
  categoryId: number;
  categoryName: string;
  subCategoriesCountStats: SubCategoryCount[];
}

const SubCategoryChart = ({
  categoryId,
  categoryName,
  subCategoriesCountStats,
}: CategoryChartProps) => {
  const relevantSubCategories = subCategoriesCountStats.filter(
    (subCat) => subCat.categoryId === categoryId
  );

  const numberOfSoundRecords: number = relevantSubCategories.reduce(
    (totalCategoryCount: number, stat: SubCategoryCount) =>
      totalCategoryCount + Number(stat.subCategoryCount),
    0
  );

  const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52);
  const randomRGB = () => `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;
  let randomColorArray: string[] = [];
  for (let i = 0; i < 20; i++) {
    randomColorArray.push(randomRGB());
  }

  const data = {
    labels: relevantSubCategories.map((stat: SubCategoryCount) => stat.name),
    datasets: [
      {
        label: '# of Sound Records',
        data: relevantSubCategories.map(
          (stat: SubCategoryCount) => stat.subCategoryCount
        ),
        backgroundColor: randomColorArray,
        borderWidth: 0,
      },
    ],
  };

  return (
    <ChartContainer title={categoryName}>
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

export default SubCategoryChart;
