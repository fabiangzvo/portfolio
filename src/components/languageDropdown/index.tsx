import { useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";

import Translate from "@components/icons/translate";

import Dropdown from "../dropdown";

type DropdownProps = {
  options?: Array<{ label: string; value: string }>;
};

function LanguageDropdown(props: DropdownProps) {
  const router = useRouter();
  const translation = useTranslations("main");

  const handelClick = useCallback<React.MouseEventHandler<HTMLElement>>(
    (event) => {
      const target = event.target as HTMLElement;

      router.push(router.asPath, router.asPath, {
        locale: target.getAttribute("data-value") || "es",
      });
    },
    [router]
  );

  const { options, label } = useMemo(() => {
    const options = [
      { label: "EN", value: "en" },
      { label: "ES", value: "es" },
      { label: "PT", value: "pt" },
    ];

    const label = (
      <>
        <Translate /> &emsp;
        {options.find((language) => language.value === router.locale)?.label}
      </>
    );

    return { options, label };
  }, [translation, router]);

  return (
    <Dropdown
      id="translate-dropdown"
      label={label}
      options={options}
      handleClick={handelClick}
    />
  );
}

export default LanguageDropdown;
