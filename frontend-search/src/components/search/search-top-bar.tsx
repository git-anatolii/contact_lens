'use client';

import { useAppSelector } from 'src/lib/hook';
import { RootState } from 'src/lib/store';

interface Props {
  onNavClick: any;
  viewAs: boolean;
  lang: string;
}

const SearchTopBar: React.FC<Props> = ({
  onNavClick,
  viewAs,
  lang,
}) => {
  const {
    loading,
    total_count,
    error,
  }: { loading: boolean; total_count: number; error: string } = useAppSelector(
    (state: RootState) => state.lens
  );
  return (
    <div className="flex items-center justify-between mb-6 filters-panel">
      <div className="flex items-center justify-between w-full">
        <div className="">Total: {total_count}</div>
        <div className="list-view">
          <div className="btn btn-gridview text-skin-base text-opacity-70">
            View as:
          </div>
          <button
            type="button"
            id="grid-5"
            className={`btn btn-view grid ${(viewAs && 'active') || ''}`}
            onClick={() => onNavClick(!viewAs)}
          >
            <div>
              <div className="icon-bar"></div>
              <div className="icon-bar"></div>
              <div className="icon-bar"></div>
            </div>
          </button>
          <button
            type="button"
            id="list-view"
            className={`btn btn-view list ${(!viewAs && 'active') || ''}`}
            onClick={() => onNavClick(!viewAs)}
          >
            <div>
              <div className="icon-bar"></div>
              <div className="icon-bar"></div>
              <div className="icon-bar"></div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
export default SearchTopBar;
