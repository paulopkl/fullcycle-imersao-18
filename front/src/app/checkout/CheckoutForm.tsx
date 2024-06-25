"use client";

import { checkoutAction } from "@/actions";
import { ErrorMessage } from "@/components/ErrorMessage";
import React, { PropsWithChildren } from "react";
import { useFormState } from "react-dom";

export async function getCardHash({
  cardName,
  cardNumber,
  expireDate,
  backNumber,
}: any) {
  //
  return Math.random().toString(36).substring(7);
}

export type CheckoutFormProps = {
  className?: string;
};

export function CheckoutForm(props: PropsWithChildren<CheckoutFormProps>) {
  const [state, formAction] = useFormState(checkoutAction, {
    error: null as string | null,
  });

  return (
    <form
      action={async (formData: FormData) => {
        const card_hash = await getCardHash({
          cardName: formData.get("card_name") as string,
          cardNumber: formData.get("card_number") as string,
          expireDate: formData.get("due_date") as string,
          security_number: formData.get("security_number") as string,
        });

        formAction({
          cardHash: card_hash,
          email: formData.get("email") as string,
        });
      }}
      className={props.className}
    >
      {state?.error && <ErrorMessage error={state.error} />}
      <input type="hidden" name="card_hash" />
      {props.children}
    </form>
  );
}
