import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@netmetric/ui";
import Link from "next/link";
import type { ReactNode } from "react";

export type CrmEntityTableColumn<TItem> = {
  key: string;
  header: string;
  render: (item: TItem) => ReactNode;
};

export function CrmEntityTable<TItem extends { id: string }>({
  caption,
  columns,
  rows,
  detailBasePath,
}: Readonly<{
  caption: string;
  columns: CrmEntityTableColumn<TItem>[];
  rows: TItem[];
  detailBasePath: string;
}>) {
  return (
    <Table>
      <TableCaption>{caption}</TableCaption>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.key}>{column.header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            {columns.map((column, index) => (
              <TableCell key={column.key}>
                {index === 0 ? (
                  <Link
                    className="underline-offset-4 hover:underline"
                    href={`${detailBasePath}/${row.id}`}
                  >
                    {column.render(row)}
                  </Link>
                ) : (
                  column.render(row)
                )}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
