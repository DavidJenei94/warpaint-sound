import { useAppSelector } from '../../../hooks/redux-hooks';

import Select from '../../UI/Select';

interface CategorySelectProps {
  categoryId: number;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const CategorySelect = ({ categoryId, onChange }: CategorySelectProps) => {
  const categories = useAppSelector((state) => state.categories);

  const categoryOptionList = categories.categories.map((category) => {
    return { value: category.id.toString(), text: category.name };
  });
  categoryOptionList.unshift({ value: '0', text: '-' });

  return (
    <>
      <Select
        id="categoryId"
        name="categoryId"
        value={categoryId}
        onChange={onChange}
        optionList={categoryOptionList}
        required
      />
    </>
  );
};

export default CategorySelect;
