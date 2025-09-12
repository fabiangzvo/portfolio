import { useCallback } from "react";
import { useRouter } from "next/router";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, SharedSelection } from "@heroui/react";
import { twMerge } from "tailwind-merge";

import Translate from "@components/icons/translate";

import { languagesAllowed } from "./constants";

function LanguageDropdown() {
  const router = useRouter();

  const handelClick = useCallback(
    (item: SharedSelection) => router.push(router.asPath, router.asPath, {
      locale: item.currentKey || "es",
    }),
    [router]
  );

  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <Button
          variant="bordered"
          color="default"
          startContent={<Translate />}
        >
          {languagesAllowed.find((language) => language.value === router.locale)?.label}
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant="flat" items={languagesAllowed} selectionMode="single" onSelectionChange={handelClick}>
        {(item) => (
          <DropdownItem
            key={item.value}
            className={twMerge(item.value === router.locale && "text-primary")}
            color={item.value === router.locale ? "primary" : "default"}
          >
            {item.label}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>

  );
}

export default LanguageDropdown;
