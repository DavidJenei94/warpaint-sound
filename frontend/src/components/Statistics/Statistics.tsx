import { useEffect, useState, useContext } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { CategoriesCountStats } from '../../models/category.model';
import { backendUrl } from '../../utils/general.utils';
import FeedbackContext from '../../store/feedback-context';
import useFeedbackHider from '../../hooks/useFeedbackHider';
import { Helmet } from 'react-helmet';

import SubCategoryChart from './SubCategoryChart';
import CategoryChart from './CategoryChart';

import styles from './Statistics.module.scss';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const Statistics = () => {
  useFeedbackHider();

  const ctx = useContext(FeedbackContext);

  const [categoriesCountStats, setCategoriesCountStats] =
    useState<CategoriesCountStats | null>(null);

  useEffect(() => {
    const fetchCategoriesCountStats = async () => {
      try {
        const response = await fetch(`${backendUrl}/statistics/category`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setCategoriesCountStats(data);
      } catch (error) {
        ctx.showMessage('Getting Statistics from server failed', 3000);
      }
    };
    fetchCategoriesCountStats();
  }, []);

  return (
    <div className={styles.statistics}>
      <Helmet>
        <title>Statistics - WpS</title>
        <meta name="description" content="Statistics of Sound Records" />
        <meta name="keywords" content="Sound, Audio, Statistics" />
      </Helmet>
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
