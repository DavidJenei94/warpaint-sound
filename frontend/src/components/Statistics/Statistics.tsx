import { useEffect, useState, useContext } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { CategoriesCountStats } from '../../models/category.model';

import SubCategoryChart from './SubCategoryChart';
import CategoryChart from './CategoryChart';

import styles from './Statistics.module.scss';
import FeedbackContext from '../../store/feedback-context';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const Statistics = () => {
  const ctx = useContext(FeedbackContext);

  const [categoriesCountStats, setCategoriesCountStats] =
    useState<CategoriesCountStats | null>(null);

  useEffect(() => {
    const fetchCategoriesCountStats = async () => {
      try {
        const response = await fetch(
          'http://localhost:8002/api/statistics/category'
        );
        const data = await response.json();

        setCategoriesCountStats(data);
      } catch (error) {
        ctx.showMessage('Getting Statistics from server failed', 3000);
      }
    };
    fetchCategoriesCountStats();
  }, []);

  return (
    <div className={styles.statistics}>
      <h1>Statistics</h1>
      <div className={styles['charts-container']}>
        {categoriesCountStats && (
          <CategoryChart
            categoriesCountStats={categoriesCountStats.categoryCountStats}
          />
        )}
        {categoriesCountStats &&
          categoriesCountStats.categoryCountStats.map((category) => (
            <SubCategoryChart
              key={category.id}
              categoryId={category.id}
              categoryName={category.name}
              subCategoriesCountStats={
                categoriesCountStats.subCategoryCountStats
              }
            />
          ))}
      </div>
    </div>
  );
};

export default Statistics;
