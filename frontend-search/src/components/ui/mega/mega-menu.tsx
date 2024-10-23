
import Link from '@components/ui/link';
import Image from '@components/ui/image';

const ListMenu = ({ dept, data, hasSubMenu, menuIndex, lang }: any) => {

  return (
    <li className="relative">
      {data?.image && (
        <Link href={`/${lang}${data.path}`}>
          <Image
            src={data?.image?.thumbnail ?? '/assets/placeholder/collection.svg'}
            alt={data.label || "categorythumbnail"}
            width={255}
            height={160}
            loading={'lazy'}
            sizes={'(max-width: 768px) 15vw,10vw'}
            className="bg-sink-thumbnail object-cover transition duration-200 ease-in-out transform "
          />
        </Link>
      )}

      <Link
        href={`/${lang}${data.path}`}
        className={`flex items-center justify-between py-2 hover:text-skin-primary ${
          data.subMenu ? 'text-base font-medium' : ' '
        }`}
      >
        {data.label}
      </Link>
      {hasSubMenu && (
        <SubMenu
          dept={dept}
          data={data.subMenu}
          menuIndex={menuIndex}
          lang={lang}
        />
      )}
    </li>
  );
};

const SubMenu: React.FC<any> = ({ dept, data, menuIndex, lang }) => {
  dept = dept + 1;
  return (
    <ul className="subMenuChild  w-full py-1">
      {data?.map((menu: any, index: number) => {
        const menuName: string = `sidebar-submenu-${dept}-${menuIndex}-${index}`;
        return (
          <ListMenu
            dept={dept}
            data={menu}
            hasSubMenu={menu.subMenu}
            menuName={menuName}
            key={menuName}
            menuIndex={index}
            lang={lang}
          />
        );
      })}
    </ul>
  );
};

export default ListMenu;
