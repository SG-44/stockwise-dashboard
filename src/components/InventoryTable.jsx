import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export const InventoryTable = ({ items, onEdit, onDelete }) => {
  const getStatusBadge = (status) => {
    const variants = {
      "in-stock": "success",
      "low-stock": "warning",
      "out-of-stock": "destructive",
    };

    const labels = {
      "in-stock": "In Stock",
      "low-stock": "Low Stock",
      "out-of-stock": "Out of Stock",
    };

    return <Badge variant={variants[status]}>{labels[status]}</Badge>;
  };

  return (
    <div>
      {/* Desktop / large screens: table (visible md and up) */}
      <div className="rounded-lg border bg-card overflow-x-auto hidden md:!block w-full">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="md:table-cell">SKU</TableHead>
              <TableHead className="lg:table-cell">Category</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell className="text-muted-foreground md:table-cell">
                  {item.sku}
                </TableCell>
                <TableCell className="lg:table-cell">{item.category}</TableCell>
                <TableCell className="text-right">{item.quantity}</TableCell>
                <TableCell className="text-right">
                  ${item.price.toFixed(2)}
                </TableCell>
                <TableCell>{getStatusBadge(item.status)}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit(item)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDelete(item.id)}
                        className="text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile: stacked cards (visible below md) */}
      <div className="overflow-x-auto md:hidden w-full space-y-3">
        {items.map((item) => (
          <div key={item.id} className="p-4 border rounded-lg bg-card">
            <div className="flex justify-between items-start">
              <div className="min-w-0">
                <div className="font-medium truncate">{item.name}</div>
                <div className="text-muted-foreground text-sm truncate">
                  {item.sku}
                </div>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(item)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="mt-3 text-sm grid grid-cols-2 gap-2 sm:hidden">
              <div className="text-muted-foreground">Category</div>
              <div className="truncate">{item.category}</div>

              <div className="text-muted-foreground">Quantity</div>
              <div>{item.quantity}</div>

              <div className="text-muted-foreground">Price</div>
              <div>${item.price.toFixed(2)}</div>

              <div className="text-muted-foreground">Status</div>
              <div>{getStatusBadge(item.status)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
