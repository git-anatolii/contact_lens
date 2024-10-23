import { useState, useEffect, type FC } from 'react';
import { useAppDispatch, useAppSelector } from 'src/lib/hook';
import { RootState } from 'src/lib/store';
import Button from '@components/ui/button';
import SoftLensCard from '../product-items/card-items/soft-lens-card';
import SoftLensList from '../product-items/list-items/soft-lens-list';
import Pagination from '@components/ui/pagination';
import { GrNext, GrPrevious } from 'react-icons/gr';
import { Product } from '@utils/types';
import { getAllSoftLensThunk } from 'src/lib/reducers/lensSlice';

interface SoftLensGridProps {
  lang: string;
  className?: string;
  viewAs: boolean;
}

export const SoftLensGrid: FC<SoftLensGridProps> = ({
  className = '',
  lang,
  viewAs,
}) => {
  const dispatch = useAppDispatch();
  const countPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const {
    loading,
    softLens,
    total_count,
    error,
  }: { loading: boolean; softLens: any; total_count: number; error: string } =
    useAppSelector((state: RootState) => state.lens);
  const updatePage = (p: any) => {
    setCurrentPage(p);
    dispatch(
      getAllSoftLensThunk({
        limit: countPerPage,
        offset: currentPage * countPerPage - 1,
      })
    );
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div
        className={`${
          viewAs
            ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'
            : 'grid grid-cols-1 gap-8'
        } ${className}`}
      >
        {softLens.map((item: any, index: number) => {
          if (viewAs) {
            return (
              <SoftLensCard
                key={`product--key-${index}`}
                product={item}
                lang={lang}
              />
            );
          } else {
            return (
              <SoftLensList
                key={`product--key-${index}`}
                product={item}
                lang={lang}
              />
            );
          }
        })}
      </div>
      <div className="pt-8 text-center xl:pt-10">
        <Pagination
          current={currentPage}
          onChange={updatePage}
          pageSize={countPerPage}
          total={total_count}
          prevIcon={<GrPrevious size={12} style={{ color: '#090B17' }} />}
          nextIcon={<GrNext size={12} style={{ color: '#090B17' }} />}
          className="order-table-pagination"
        />
      </div>
    </>
  );
};
