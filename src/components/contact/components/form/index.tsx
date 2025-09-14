import { useTranslations } from "next-intl";
import { Card } from "@heroui/react";

import Input from "@components/input";
import Button from "@components/button";

interface FormProps {
  handleClick: React.MouseEventHandler<HTMLFormElement>;
}

function Form(props: FormProps) {
  const { handleClick } = props;
  const translations = useTranslations("contact");

  return (
    <Card>
      <form
        className="flex flex-col w-full bg-background rounded-xl px-24 pt-12 pb-16 max-md:px-[3em] text-base bg-background/20"
        onSubmit={handleClick}
      >
        <h1 className="pointer-events-none text-paragraph w-full text-center text-xl font-extrabold mb-10">
          {translations("label")}
        </h1>
        <Input
          name="subject"
          label={translations("subject")}
          type="text"
          placeholder="Subject"
          required
        />
        <Input
          name="email"
          label={translations("email")}
          type="email"
          placeholder="example@example.com"
          required
        />
        <div className="mb-10">
          <label
            htmlFor="message"
            className="block mb-2 text-base text-text"
          >
            {translations("message")}
          </label>
          <textarea
            id="message"
            className="bg-stroke text-base rounded-lg block w-full p-2.5"
            placeholder={translations("messagePlaceholder")}
            required
          />
        </div>
        <Button type="submit" label={translations("send")} />
      </form>
    </Card>
  );
}

export default Form;
