'use client';
import { useClickOutside } from '@/hooks';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { FormEvent, useRef, useState } from 'react';

export const SearchButton = ({ isSidebar }: { isSidebar?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const divRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (dataForm?: FormEvent<HTMLFormElement>) => {
    const params = new URLSearchParams(searchParams);
    if (!dataForm) {
      params.delete('search');
      replace(`${pathName}?${params.toString()}`);
      return;
    }
    dataForm.preventDefault();
    const data = new FormData(dataForm.currentTarget);
    const dataSearch = data.get('search');
    if (dataSearch) {
      params.set('search', dataSearch.toString());
    } else {
      params.delete('search');
    }
    replace(`/?${params.toString()}`);
  };
  useClickOutside({ divRef, setIsOpen });

  return (
    <div className={classNames(isSidebar ? 'w-full sm:hidden flex group' : 'hidden sm:flex group')}>
      <div
        ref={divRef}
        className={classNames(
          !isOpen && !isSidebar ? 'hidden' : isSidebar ? 'w-full p-1 h-full' : '',
        )}
      >
        <form
          onSubmit={handleSubmit}
          className="sm:ml-6  flex items-center rounded-lg bg-white px-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-gray-400"
        >
          <input
            id="search"
            name="search"
            type="search"
            defaultValue={searchParams.get('search')?.toString()}
            placeholder="Buscar"
            onChange={e => {
              if (!e.currentTarget.value) {
                handleSubmit();
              }
            }}
            className="block min-w-0 grow  text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
          />
          <button type="submit" className="all-unset">
            <MagnifyingGlassIcon aria-hidden="true" className="text-gray-400 h-5 w-5" />
          </button>
        </form>
      </div>
      <button
        type="button"
        className={classNames(
          isOpen || isSidebar
            ? 'hidden'
            : 'relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800',
        )}
        onClick={() => setIsOpen(true)}
      >
        <span className="absolute -inset-1.5" />
        <span className="sr-only">View notifications</span>
        <MagnifyingGlassIcon aria-hidden="true" className="size-6" />
      </button>
    </div>
  );
};
