export interface EditableCellProps {
  value: string;
  editable: boolean;
  save: (value) => unknown;
}
