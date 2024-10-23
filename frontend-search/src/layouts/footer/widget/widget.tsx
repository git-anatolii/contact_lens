import WidgetLink from './widget-link';
import WidgetAbout from './widget-about-us';
import Container from '@components/ui/container';
import { footer } from '../data';

interface WidgetsProps {
  lang: string;
  variant?: 'default' | 'medium';
  widgets: {
    id: number;
    widgetTitle: string;
    lists: any;
  }[];
}

const Widgets: React.FC<WidgetsProps> = ({
  lang,
  widgets,
  variant = 'default',
}) => {
  const { social } = footer;
  return (
    <Container>
      <div className="grid grid-cols-7 pt-10 md:pt-16 mb-16">
        <WidgetAbout
          social={social}
          className="col-span-full sm:col-span-1 md:col-span-3"
          lang={lang}
        />
        {widgets?.map((widget) => (
          <WidgetLink
            key={`footer-widget--key${widget.id}`}
            data={widget}
            className="pb-3.5 sm:pb-0 col-span-1 md:col-span-2"
            lang={lang}
          />
        ))}
      </div>
    </Container>
  );
};

export default Widgets;
