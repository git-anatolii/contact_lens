import Link from '@components/ui/link';
import cn from "classnames";
interface Props {
    className?: string;
  href: string;
  btnProps: React.ButtonHTMLAttributes<any>;
  isAuthorized: boolean;
}

export default function AuthMenu({
  className,
  isAuthorized,
  href,
  btnProps,
  children,
}: React.PropsWithChildren<Props>) {
  return isAuthorized ? (
    <Link
      href={href}
      className={cn('text-sm text-white font-normal focus:outline-none ms-2', className)}
    >
      {children}
    </Link>
  ) : (
    <button
        className={cn('text-sm text-white font-normal focus:outline-none ms-2', className)}
      aria-label="Authentication"
      {...btnProps}
    />
  );
}
