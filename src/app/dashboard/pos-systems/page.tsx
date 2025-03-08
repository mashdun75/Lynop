"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/components/supabase-provider";
import { DashboardLayout } from "@/components/dashboard/layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Store,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Settings,
  Wifi,
  MapPin,
  MoreHorizontal,
  Search,
  Filter,
  Download,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function POSSystemsPage() {
  const { session } = useSupabase();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [addingPOS, setAddingPOS] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Mock POS systems data
  const [posSystems, setPosSystems] = useState([
    {
      id: "1",
      name: "Main Store POS",
      type: "Square Terminal",
      location: "New York - Main Street",
      status: "online",
      lastSeen: "2023-10-16T14:30:00Z",
      firmwareVersion: "4.2.1",
      updateAvailable: false,
    },
    {
      id: "2",
      name: "Checkout 1",
      type: "Clover Flex",
      location: "New York - Main Street",
      status: "online",
      lastSeen: "2023-10-16T14:25:00Z",
      firmwareVersion: "3.5.2",
      updateAvailable: true,
    },
    {
      id: "3",
      name: "Checkout 2",
      type: "Clover Flex",
      location: "New York - Main Street",
      status: "offline",
      lastSeen: "2023-10-15T18:45:00Z",
      firmwareVersion: "3.5.2",
      updateAvailable: true,
    },
    {
      id: "4",
      name: "Mobile POS 1",
      type: "Square Reader",
      location: "New York - Main Street",
      status: "online",
      lastSeen: "2023-10-16T13:10:00Z",
      firmwareVersion: "2.1.0",
      updateAvailable: false,
    },
    {
      id: "5",
      name: "Brooklyn Store POS",
      type: "Shopify POS",
      location: "Brooklyn - Atlantic Ave",
      status: "online",
      lastSeen: "2023-10-16T14:15:00Z",
      firmwareVersion: "5.0.3",
      updateAvailable: false,
    },
    {
      id: "6",
      name: "Brooklyn Checkout 1",
      type: "Shopify POS",
      location: "Brooklyn - Atlantic Ave",
      status: "online",
      lastSeen: "2023-10-16T14:10:00Z",
      firmwareVersion: "5.0.3",
      updateAvailable: false,
    },
    {
      id: "7",
      name: "Queens Store POS",
      type: "Toast",
      location: "Queens - Northern Blvd",
      status: "offline",
      lastSeen: "2023-10-15T20:30:00Z",
      firmwareVersion: "2.4.5",
      updateAvailable: true,
    },
  ]);

  const handleAddPOS = () => {
    setAddingPOS(true);
  };

  const handleSubmitPOS = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would add the POS to the database
    setAddingPOS(false);
    // Mock adding a new POS
    const newPOS = {
      id: `${posSystems.length + 1}`,
      name: "New POS Terminal",
      type: "Square Terminal",
      location: "New Location",
      status: "online",
      lastSeen: new Date().toISOString(),
      firmwareVersion: "4.2.1",
      updateAvailable: false,
    };
    setPosSystems([...posSystems, newPOS]);
  };

  const handleUpdateFirmware = (id: string) => {
    // In a real app, this would trigger a firmware update
    setPosSystems(
      posSystems.map((pos) =>
        pos.id === id ? { ...pos, updateAvailable: false } : pos,
      ),
    );
    alert(`Firmware update initiated for POS #${id}`);
  };

  const filteredPOS = posSystems.filter((pos) => {
    if (!searchQuery) {
      if (activeTab === "all") return true;
      if (activeTab === "online") return pos.status === "online";
      if (activeTab === "offline") return pos.status === "offline";
      if (activeTab === "updates") return pos.updateAvailable;
      return true;
    }

    return (
      (pos.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pos.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pos.location.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (activeTab === "all" ||
        (activeTab === "online" && pos.status === "online") ||
        (activeTab === "offline" && pos.status === "offline") ||
        (activeTab === "updates" && pos.updateAvailable))
    );
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">POS Systems</h1>
            <p className="text-muted-foreground">
              Manage your point-of-sale devices and terminals
            </p>
          </div>
          <Button onClick={handleAddPOS}>
            <Plus className="mr-2 h-4 w-4" /> Add POS
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Total POS Systems
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{posSystems.length}</div>
              <p className="text-xs text-muted-foreground">
                Across all locations
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Online</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {posSystems.filter((pos) => pos.status === "online").length}
              </div>
              <p className="text-xs text-muted-foreground">Currently active</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Offline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {posSystems.filter((pos) => pos.status === "offline").length}
              </div>
              <p className="text-xs text-muted-foreground">Needs attention</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Updates Available
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {posSystems.filter((pos) => pos.updateAvailable).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Firmware updates pending
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>POS Devices</CardTitle>
            <CardDescription>
              Manage and monitor all your point-of-sale devices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              defaultValue="all"
              className="w-full"
              onValueChange={setActiveTab}
            >
              <TabsList className="grid w-full grid-cols-4 mb-4">
                <TabsTrigger value="all">All Devices</TabsTrigger>
                <TabsTrigger value="online">Online</TabsTrigger>
                <TabsTrigger value="offline">Offline</TabsTrigger>
                <TabsTrigger value="updates">Updates Available</TabsTrigger>
              </TabsList>

              <div className="flex flex-col md:flex-row justify-between mb-4 space-y-2 md:space-y-0">
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search devices..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Seen</TableHead>
                      <TableHead>Firmware</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPOS.map((pos) => (
                      <TableRow key={pos.id}>
                        <TableCell className="font-medium">
                          {pos.name}
                        </TableCell>
                        <TableCell>{pos.type}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                            {pos.location}
                          </div>
                        </TableCell>
                        <TableCell>
                          {pos.status === "online" ? (
                            <div className="flex items-center">
                              <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                              <span>Online</span>
                            </div>
                          ) : (
                            <div className="flex items-center">
                              <div className="h-2 w-2 rounded-full bg-red-500 mr-2"></div>
                              <span>Offline</span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell>{formatDate(pos.lastSeen)}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <span className="mr-2">{pos.firmwareVersion}</span>
                            {pos.updateAvailable && (
                              <Badge
                                variant="outline"
                                className="bg-amber-100 text-amber-800 border-amber-200"
                              >
                                Update Available
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            {pos.updateAvailable && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleUpdateFirmware(pos.id)}
                              >
                                <RefreshCw className="h-4 w-4 mr-1" />
                                Update
                              </Button>
                            )}
                            <Button variant="ghost" size="icon">
                              <Settings className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Tabs>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Connection Status</CardTitle>
              <CardDescription>
                Real-time status of your POS network
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center">
                    <Wifi className="h-5 w-5 mr-2 text-green-500" />
                    <div>
                      <p className="font-medium">API Connection</p>
                      <p className="text-sm text-muted-foreground">
                        Secure connection established
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-green-100 text-green-800 border-green-200"
                  >
                    Connected
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center">
                    <Wifi className="h-5 w-5 mr-2 text-green-500" />
                    <div>
                      <p className="font-medium">Encryption Status</p>
                      <p className="text-sm text-muted-foreground">
                        Quantum-resistant encryption active
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-green-100 text-green-800 border-green-200"
                  >
                    Secure
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center">
                    <Wifi className="h-5 w-5 mr-2 text-amber-500" />
                    <div>
                      <p className="font-medium">Data Sync</p>
                      <p className="text-sm text-muted-foreground">
                        Last sync 5 minutes ago
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-amber-100 text-amber-800 border-amber-200"
                  >
                    Syncing
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Common management tasks for your POS systems
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center space-y-2"
                >
                  <RefreshCw className="h-6 w-6" />
                  <span>Update All Firmware</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center space-y-2"
                >
                  <Store className="h-6 w-6" />
                  <span>Add New Location</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center space-y-2"
                >
                  <Settings className="h-6 w-6" />
                  <span>Configure Defaults</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center space-y-2"
                >
                  <Download className="h-6 w-6" />
                  <span>Export Devices</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={addingPOS} onOpenChange={setAddingPOS}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New POS System</DialogTitle>
            <DialogDescription>
              Connect a new point-of-sale device to your Lynop account
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmitPOS} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="posName">Device Name</Label>
              <Input id="posName" placeholder="Main Register" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="posType">Device Type</Label>
              <select
                id="posType"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="square">Square Terminal</option>
                <option value="clover">Clover Flex</option>
                <option value="shopify">Shopify POS</option>
                <option value="toast">Toast</option>
                <option value="lightspeed">Lightspeed</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="posLocation">Location</Label>
              <Input id="posLocation" placeholder="New York - Main Street" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="posIP">IP Address (Optional)</Label>
              <Input id="posIP" placeholder="192.168.1.100" />
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setAddingPOS(false)}
                type="button"
              >
                Cancel
              </Button>
              <Button type="submit">Add Device</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
