import styles from './ChartContainer.module.scss';

interface ChartContainerProps {
  title: string;
  children: React.ReactNode;
}

const ChartContainer = ({ title, children }: ChartContainerProps) => {
  return (
    <div className={styles.container}>
      <p>{title}</p>
      <div className={styles.chart}>{children}</div>
    </div>
  );
};

export default ChartContainer;
