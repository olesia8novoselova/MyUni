"use client";

import CardAdmin from "./CardsAdmins/CardAdmin";

const Psychologists = () => {
  return (
    <div>
      <CardAdmin
        name={"Name Surname"}
        tg={"@username"}
        image={"image"}
        language={"eng/ru"}
        description={"Some boring biography.... Some boring biography.... Some boring biography.... Some boring biography.... Some boring biography.... Some boring biography.... Also boring biography.... Some boring biography.... Even more boring biography.... Some boring biograp"}
        onClick={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  );
};
