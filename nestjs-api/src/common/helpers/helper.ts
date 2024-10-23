import { ObjectId } from 'mongodb';
import { UserData } from '../dto/index.dto';

import { promises as fs } from 'fs';
import { join } from 'path';

export const removeMongoDbFeilds = () => {
  return 'Abc';
};

export const mongodbDateFormat = (
  field: string,
  format: string = '%Y/%m/%d',
) => {
  return {
    $dateToString: {
      format: format,
      date: field,
    },
  };
};

export const getUsersDataFromRequest = (request): UserData => {
  if (request && request.user) {
    return request.user;
  } else {
    return null;
  }
};

/**
 * Constructs an object with createdAt, updatedAt, createdBy, and updatedBy fields.
 * @param userId - The MongoDB ObjectId representing the user who created or updated the entity.
 * @returns An object with createdAt, updatedAt, createdBy, and updatedBy fields.
 * @throws Error if userId is not a valid MongoDB ObjectId.
 */

export const defaultCreatedAndUpdatedBy = (userId: ObjectId) => {
  if (!(userId instanceof ObjectId) && !ObjectId.isValid(userId)) {
    throw new Error('userId must be a valid MongoDB ObjectId');
  }

  const currentDate = new Date();
  return {
    createdAt: currentDate,
    updatedAt: currentDate,
    createdBy: userId,
    updatedBy: userId,
  };
};

export async function writeJsonFile(
  fileName: string,
  data: object,
): Promise<void> {
  const jsonData = JSON.stringify(data, null, 2);
  const filePath = join('D:', 'WorkSpace', 'Python', 'LearnPython', fileName);

  console.log(filePath, 'FIle path');

  try {
    await fs.writeFile(filePath, jsonData);
    console.log('JSON file has been written successfully');
  } catch (err) {
    console.error('Error writing file', err);
  }
}
