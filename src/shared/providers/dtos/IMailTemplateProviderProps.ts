interface ITemplateVariables {
  [key: string]: string | number;
}

export interface IMailTemplateProviderProps {
  file: string;
  variables: ITemplateVariables;
}
