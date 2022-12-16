import { Categories } from '../../../models/category.model';

import Select from '../../UI/Select';

interface CategorySelectProps {
  categoryId: number;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  categories: Categories;
}

const CategorySelect = ({
  categoryId,
  onChange,
  categories,
}: CategorySelectProps) => {
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
