import { DataItem, Option } from '@/interface';
import { Status } from '@/types/statusEnum';

/**
 * Function to get the key name by its value from the Status enum.
 *
 * @param value - The value of the status (0 or 1).
 * @returns The key name corresponding to the value (e.g., 'Active' or 'Inactive'), or undefined if not found.
 */
export function getStatusKeyByValue(value: number | string): string {
  for (let key in Status) {
    if (Status[key as keyof typeof Status] === value) {
      return key;
    }
  }
  throw new Error(`No status found for value: ${value}`);
}

export const transformDataToOptions = (data: DataItem[]): Option[] => {
  return data.map((item) => ({
    name: item.name, // Extract the 'name' from the data
    id: item._id, // Use '_id' as the 'id' for the options
  }));
};
