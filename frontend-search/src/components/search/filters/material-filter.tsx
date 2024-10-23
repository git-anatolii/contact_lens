import SelectedFilters from '../selected-filters';

export const MaterialFilters: React.FC<{ lang: string }> = ({ lang }) => {
  return (
    <div className="space-y-10">
      <SelectedFilters lang={lang} />
    </div>
  );
};
