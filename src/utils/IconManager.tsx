import React from 'react'
import { ServerErrorIcon2 } from "../views/Common/Icons/serverErrorIcon2";
import { UaliIcon } from "../views/Common/Icons/ualiIcon";

export const getIcons = (name: string) => {
    const icons: Map<string, JSX.Element> = new Map();

    icons.set('server-error2', <ServerErrorIcon2 /> );
  icons.set('uali-icon', <UaliIcon />);


  return icons.get(name);

}