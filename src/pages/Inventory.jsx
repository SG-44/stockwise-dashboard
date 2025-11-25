import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InventoryTable } from "@/components/InventoryTable";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const itemSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  sku: z.string().trim().min(1, "SKU is required").max(50, "SKU must be less than 50 characters"),
  category: z.string().min(1, "Category is required"),
  quantity: z.coerce.number().min(0, "Quantity must be at least 0").int("Quantity must be a whole number"),
  price: z.coerce.number().min(0.01, "Price must be at least 0.01"),
});

const mockItems = [
  {
    id: "1",
    name: "Wireless Mouse",
    sku: "WM-001",
    category: "Electronics",
    quantity: 45,
    price: 29.99,
    status: "in-stock",
  },
  {
    id: "2",
    name: "USB Cable",
    sku: "UC-002",
    category: "Accessories",
    quantity: 8,
    price: 9.99,
    status: "low-stock",
  },
  {
    id: "3",
    name: "Keyboard",
    sku: "KB-003",
    category: "Electronics",
    quantity: 0,
    price: 79.99,
    status: "out-of-stock",
  },
  {
    id: "4",
    name: "Monitor Stand",
    sku: "MS-004",
    category: "Furniture",
    quantity: 120,
    price: 49.99,
    status: "in-stock",
  },
];

const Inventory = () => {
  const [items, setItems] = useState(mockItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const { control, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      name: "",
      sku: "",
      category: "",
      quantity: 0,
      price: 0,
    },
  });

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (item) => {
    toast.info(`Editing ${item.name}`);
  };

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
    toast.success("Item deleted successfully");
  };

  const onSubmit = (data) => {
    const status = data.quantity === 0 
      ? "out-of-stock" 
      : data.quantity < 10 
      ? "low-stock" 
      : "in-stock";

    const newItem = {
      id: Date.now().toString(),
      ...data,
      status,
    };

    setItems([newItem, ...items]);
    toast.success("Item added successfully");
    reset();
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Inventory</h1>
          <p className="text-muted-foreground mt-1">Manage your inventory items</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Item</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} id="name" placeholder="Item name" />
                    )}
                  />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU</Label>
                  <Controller
                    name="sku"
                    control={control}
                    render={({ field }) => (
                      <Input {...field} id="sku" placeholder="SKU-001" />
                    )}
                  />
                  {errors.sku && (
                    <p className="text-sm text-destructive">{errors.sku.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Electronics">Electronics</SelectItem>
                          <SelectItem value="Accessories">Accessories</SelectItem>
                          <SelectItem value="Furniture">Furniture</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.category && (
                    <p className="text-sm text-destructive">{errors.category.message}</p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Controller
                      name="quantity"
                      control={control}
                      render={({ field }) => (
                        <Input {...field} id="quantity" type="number" placeholder="0" />
                      )}
                    />
                    {errors.quantity && (
                      <p className="text-sm text-destructive">{errors.quantity.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Controller
                      name="price"
                      control={control}
                      render={({ field }) => (
                        <Input {...field} id="price" type="number" placeholder="0.00" step="0.01" />
                      )}
                    />
                    {errors.price && (
                      <p className="text-sm text-destructive">{errors.price.message}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" type="button" onClick={() => setDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Add Item
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <InventoryTable items={filteredItems} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default Inventory;
