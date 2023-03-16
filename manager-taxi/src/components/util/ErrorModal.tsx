import * as React from "react";
import { HandlerFuncType } from "../../types/types";
import { SimpleModal } from "./UIElements/Modal";

export function ErrorModal({
  error,
  onClear,
}: {
  error: string | null;
  onClear: HandlerFuncType;
}) {
  const TXT_ERROR = "אירעה שגיאה";

  return (
    <SimpleModal
      show={!!error}
      header={TXT_ERROR}
      content={error!}
      onCancel={onClear}
    />
  );
}
