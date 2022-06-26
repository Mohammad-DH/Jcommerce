import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function AddUserAsync(PhoneNumber) {
  let user = await prisma.User.create({
    data: {
      FirstName: "",
      LastName: "",
      Email: "",
      PhoneNumber,
      Code: Math.floor(100000 + Math.random() * 900000).toString(),
    },
  });
  return user;
}

export async function AddFullUserAsync(
  FirstName,
  LastName,
  PhoneNumber,
  Email,
  Admin,
  Code
) {
  let user = await prisma.User.create({
    data: {
      FirstName,
      LastName,
      PhoneNumber,
      Email,
      Admin,
      Code,
    },
  });
}

export async function UpdateUserAsync(User) {
  const { User_Id, FirstName, LastName, PhoneNumber, Email, Admin, Code } =
    User;

  let user = await prisma.User.update({
    where: {
      User_Id,
    },
    data: {
      FirstName,
      LastName,
      PhoneNumber,
      Email,
      Admin,
      Code,
    },
  });
}

export async function UpdateUserCodeAsync(PhoneNumber) {
  let exist = await prisma.User.findFirst({
    where: {
      PhoneNumber,
    },
  });

  if (exist) {
    let user = await prisma.User.update({
      where: {
        PhoneNumber,
      },
      data: {
        Code: Math.floor(100000 + Math.random() * 900000).toString(),
      },
    });
    return user;
  }
}

export async function RemoveUserAsync(User_Id) {
  let user = await prisma.User.delete({
    where: {
      User_Id,
    },
  });
}
export async function RemoveUserCodeAsync(User_Id) {
  await prisma.User.update({
    where: {
      User_Id,
    },
    data: {
      Code: null,
    },
  });
}
