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
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "",
    quantity: "",
    price: "",
  });
  const [errors, setErrors] = useState({});
  const [editingItemId, setEditingItemId] = useState(null);

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (item) => {
    // Prefill form with item values so user can edit
    setFormData({
      name: item.name || "",
      sku: item.sku || "",
      category: item.category || "",
      quantity: String(item.quantity ?? ""),
      price: String(item.price ?? ""),
    });
    setEditingItemId(item.id);
    setDialogOpen(true);
  };

  const handleDelete = (id) => {
    setItems(items.filter((item) => item.id !== id));
    toast.success("Item deleted successfully");
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length > 100) {
      newErrors.name = "Name must be less than 100 characters";
    }

    if (!formData.sku.trim()) {
      newErrors.sku = "SKU is required";
    } else if (formData.sku.length > 50) {
      newErrors.sku = "SKU must be less than 50 characters";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    const quantity = Number(formData.quantity);
    if (formData.quantity === "" || isNaN(quantity)) {
      newErrors.quantity = "Quantity is required";
    } else if (quantity < 0 || !Number.isInteger(quantity)) {
      newErrors.quantity = "Quantity must be a positive whole number";
    }

    const price = Number(formData.price);
    if (formData.price === "" || isNaN(price)) {
      newErrors.price = "Price is required";
    } else if (price < 0.01) {
      newErrors.price = "Price must be at least 0.01";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix validation errors");
      return;
    }

    const quantity = Number(formData.quantity);
    const status =
      quantity === 0
        ? "out-of-stock"
        : quantity < 10
        ? "low-stock"
        : "in-stock";

    const preparedItem = {
      id: editingItemId ? editingItemId : Date.now().toString(),
      name: formData.name.trim(),
      sku: formData.sku.trim(),
      category: formData.category,
      quantity: quantity,
      price: Number(formData.price),
      status,
    };

    if (editingItemId) {
      // update existing
      setItems((prev) =>
        prev.map((it) => (it.id === editingItemId ? preparedItem : it))
      );
      toast.success("Item updated successfully");
    } else {
      // add new
      setItems((prev) => [preparedItem, ...prev]);
      toast.success("Item added successfully");
    }

    setFormData({ name: "", sku: "", category: "", quantity: "", price: "" });
    setErrors({});
    setEditingItemId(null);
    setDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Inventory</h1>
          <p className="text-muted-foreground mt-1">
            Manage your inventory items
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                // prepare for adding new item
                setFormData({
                  name: "",
                  sku: "",
                  category: "",
                  quantity: "",
                  price: "",
                });
                setEditingItemId(null);
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingItemId ? "Edit Item" : "Add New Item"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Item name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sku">SKU</Label>
                <Input
                  id="sku"
                  placeholder="SKU-001"
                  value={formData.sku}
                  onChange={(e) => handleInputChange("sku", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    handleInputChange("category", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="accessories">Accessories</SelectItem>
                    <SelectItem value="furniture">Furniture</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="0"
                    value={formData.quantity}
                    onChange={(e) =>
                      handleInputChange("quantity", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="0.00"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  setDialogOpen(false);
                  setEditingItemId(null);
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                {editingItemId ? "Save Changes" : "Add Item"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm py-4">
          <Search className="absolute top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="   Search items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <InventoryTable
        items={filteredItems}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Inventory;
