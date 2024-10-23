import { useState } from 'react';
import Image from 'next/image';
import Text from '@components/ui/text';
import { ROUTES } from '@utils/routes';
import { useParams } from 'next/navigation';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
} from 'react-share';
import Heading from '@components/ui/heading';

import {
  IoLocationOutline,
  IoCallOutline,
  IoGlobeOutline,
} from 'react-icons/io5';


interface ShopSidebarProps {
  data: any;
  lang: string;
}

const ShopSidebar: React.FC<ShopSidebarProps> = ({ data, lang }) => {
  const pathname = useParams();
  const { slug } = pathname;
  const [descriptionState, setDescriptionState] = useState(Boolean(false));
  const shareUrl = `${process.env.NEXT_PUBLIC_WEBSITE_URL}${ROUTES.SHOPS}/${slug}`;
  
  const descriptionHandel = () => {
    return setDescriptionState(true);
  };

  return (
    <div className="flex flex-col px-6 pt-10 lg:pt-14">
      <div className="w-full px-5 pb-8 text-center border-b border-gray-300 sm:px-8 lg:px-0 2xl:px-7">
        <div className="relative w-32 h-32 mx-auto">
          <Image
            src={data?.logo?.original!}
            alt={data?.name}
            fill
            className="rounded-xl"
          />
        </div>

        <Heading variant="titleLarge" className="mt-4 mb-1.5">
          {data?.name}
        </Heading>
        <Text variant="small">
          {descriptionState === true ? (
            data?.description
          ) : data?.description.split(' ').length >= 13 ? (
            <>
              {data?.description.split(' ').slice(0, 13).join(' ')}
              {'..'}
              <span
                role="button"
                className=" text-brand ltr:ml-0.5 rtl:mr-0.5 font-semibold block hover:text-brand-muted"
                onClick={descriptionHandel}
              >
                Read More
              </span>
            </>
          ) : (
            data?.description
          )}
        </Text>
      </div>
      <div className="space-y-6 py-7">
        <div className="flex items-start">
          <div className="w-10 shrink-0">
            <IoLocationOutline className="text-2xl text-brand-muted text-opacity-60" />
          </div>
          <div className="-mt-1">
            <h4 className="mb-1 font-medium text-brand-dark text-15px">
              Address
            </h4>
            <Text>{data?.address}</Text>
          </div>
        </div>
        <div className="flex items-start">
          <div className="w-10 shrink-0">
            <IoCallOutline className="text-2xl text-brand-muted text-opacity-60" />
          </div>
          <div className="-mt-1">
            <h4 className="mb-1 font-medium text-brand-dark text-15px">
              Phone
            </h4>
            <Text>{data?.phone}</Text>
          </div>
        </div>
        <div className="flex items-start">
          <div className="w-10 shrink-0">
            <IoGlobeOutline className="text-2xl text-brand-muted text-opacity-60" />
          </div>
          <div className="-mt-1">
            <h4 className="mb-1 font-medium text-brand-dark text-15px">
              Website
            </h4>
            <Text>
              <a
                href={`https://${data?.website}`}
                className="text-[#0077E5] hover:text-brand-muted"
              >
                {data?.website}
              </a>
            </Text>
            <div className="flexflex-wrap   pt-4 mt-0.5">
              <FacebookShareButton url={shareUrl} className="mx-1">
                <FacebookIcon
                  size={25}
                  round
                  className="transition-all hover:opacity-90"
                />
              </FacebookShareButton>
              <TwitterShareButton url={shareUrl} className="mx-1">
                <TwitterIcon
                  size={25}
                  round
                  className="transition-all hover:opacity-90"
                />
              </TwitterShareButton>
              <LinkedinShareButton url={shareUrl} className="mx-1">
                <LinkedinIcon
                  size={25}
                  round
                  className="transition-all hover:opacity-90"
                />
              </LinkedinShareButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopSidebar;
