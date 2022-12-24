import { useAppSelector } from '../../../hooks/redux-hooks';

import Select from '../Select';

interface SubCategorySelectProps {
  subCategoryId: number;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  categoryId: number;
}

const SubCategorySelect = ({
  subCategoryId,
  onChange,
  categoryId,
}: SubCategorySelectProps) => {
  const categories = useAppSelector((state) => state.categories);

  const optionList =
    categoryId !== 0
      ? categories.subCategories.filter((subCategory) => {
          return subCategory.categoryId === categoryId;
        })
      : [];
  const subCategoryOptionList = optionList.map((subCategory) => {
    return { value: subCategory.id.toString(), text: subCategory.name };
  });

  subCategoryOptionList.unshift({ value: '0', text: '-' });

  return (
    <>
      <Select
        id="subCategoryId"
        name="subCategoryId"
        value={subCategoryId}
        onChange={onChange}
        optionList={subCategoryOptionList}
        required
      />
    </>
  );
};

export default SubCategorySelect;
