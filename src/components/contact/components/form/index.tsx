import { useTranslations } from "next-intl";

import Input from "@components/input";
import Button from "@components/button";

interface FormProps {
  handleClick: React.MouseEventHandler<HTMLFormElement>;
}

function Form(props: FormProps) {
  const { handleClick } = props;
  const translations = useTranslations("contact");

  return (
    <form
      className="flex flex-col w-full bg-background border border-stroke rounded-xl px-[6em] py-[6em] shadow-lg shadow-stroke max-md:px-[3em]"
      onSubmit={handleClick}
    >
      <h1 className="pointer-events-none text-paragraph w-full text-center text-3xl font-extrabold mb-10 max-md:text-5xl">
        {translations("contact")}
      </h1>
      <Input
        name="contactName"
        label={translations("name")}
        type="text"
        placeholder="Fabián Guzmán O."
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
          className="block mb-2 text-xl text-text max-md:text-4xl"
        >
          {translations("message")}
        </label>
        <textarea
          id="message"
          className="bg-stroke text-lg rounded-lg block w-full p-2.5 max-md:text-4xl"
          placeholder={translations("messagePlaceholder")}
          required
        />
      </div>
      <Button label={translations("send")} />
    </form>
  );
}

export default Form;
