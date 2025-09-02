import { faker } from '@faker-js/faker';

/**
 * Generates a set of fake supplier form data.
 * @returns An object containing fake supplier form data.
 */
export function generateSupplierFormData() {
  return {
    SupplierContact: faker.person.fullName(),
    SupplierAddr1: faker.location.streetAddress(),
    SupplierAddr2: faker.location.secondaryAddress(),
    SupplierCity: faker.location.city(),
    SupplierPhone: faker.phone.number(),
    SupplierAccount: faker.finance.accountName(),
    SupplierZip: faker.location.zipCode(),
    SupplierFax: faker.phone.number(),
    SupplierEmail: faker.internet.email(),
  };
}
