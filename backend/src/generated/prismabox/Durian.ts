import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const DurianPlain = t.Object(
  {
    id: t.String(),
    name: t.String(),
    description: t.String(),
    imageURL: t.String(),
    createdAt: t.Date(),
    updatedAt: t.Date(),
  },
  { additionalProperties: false },
);

export const DurianRelations = t.Object({}, { additionalProperties: false });

export const DurianPlainInputCreate = t.Object(
  { name: t.String(), description: t.String(), imageURL: t.String() },
  { additionalProperties: false },
);

export const DurianPlainInputUpdate = t.Object(
  {
    name: t.Optional(t.String()),
    description: t.Optional(t.String()),
    imageURL: t.Optional(t.String()),
  },
  { additionalProperties: false },
);

export const DurianRelationsInputCreate = t.Object(
  {},
  { additionalProperties: false },
);

export const DurianRelationsInputUpdate = t.Partial(
  t.Object({}, { additionalProperties: false }),
);

export const DurianWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          name: t.String(),
          description: t.String(),
          imageURL: t.String(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "Durian" },
  ),
);

export const DurianWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object({ id: t.String() }, { additionalProperties: false }),
          { additionalProperties: false },
        ),
        t.Union([t.Object({ id: t.String() })], {
          additionalProperties: false,
        }),
        t.Partial(
          t.Object({
            AND: t.Union([
              Self,
              t.Array(Self, { additionalProperties: false }),
            ]),
            NOT: t.Union([
              Self,
              t.Array(Self, { additionalProperties: false }),
            ]),
            OR: t.Array(Self, { additionalProperties: false }),
          }),
          { additionalProperties: false },
        ),
        t.Partial(
          t.Object(
            {
              id: t.String(),
              name: t.String(),
              description: t.String(),
              imageURL: t.String(),
              createdAt: t.Date(),
              updatedAt: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Durian" },
);

export const DurianSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      name: t.Boolean(),
      description: t.Boolean(),
      imageURL: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const DurianInclude = t.Partial(
  t.Object({ _count: t.Boolean() }, { additionalProperties: false }),
);

export const DurianOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      name: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      description: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      imageURL: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      updatedAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const Durian = t.Composite([DurianPlain, DurianRelations], {
  additionalProperties: false,
});

export const DurianInputCreate = t.Composite(
  [DurianPlainInputCreate, DurianRelationsInputCreate],
  { additionalProperties: false },
);

export const DurianInputUpdate = t.Composite(
  [DurianPlainInputUpdate, DurianRelationsInputUpdate],
  { additionalProperties: false },
);
