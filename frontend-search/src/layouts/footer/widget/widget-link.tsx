import Heading from '@components/ui/heading';
import Link from '@components/ui/link';

interface Props {
  className?: string;
  lang: string;
  data: {
    widgetTitle?: string;
    lists: {
      id: string;
      path?: string;
      title: string;
      icon?: any;
    }[];
  };
}

const WidgetLink: React.FC<Props> = ({ lang, className, data }) => {
  const { widgetTitle, lists } = data;
  return (
    <div className={`${className}`}>
      <Heading
        variant="mediumHeading"
        className="text-base mb-4 sm:mb-5 lg:mb-6 pb-0.5"
      >
        {widgetTitle}
      </Heading>
      <ul className="text-sm lg:text-14px flex flex-col space-y-3">
        {lists.map((list) => (
          <li
            key={`widget-list--key${list.id}`}
            className="flex items-baseline"
          >
            {list.icon && (
              <span className="me-3 relative top-0.5 lg:top-1 text-sm lg:text-base">
                {list.icon}
              </span>
            )}

            <Link
              href={`/${lang}${list.path ? list.path : ''}`}
              className="transition-colors duration-200 hover:text-brand"
            >
              {list.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WidgetLink;
