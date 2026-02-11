

'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { usePersonalData, PortfolioData } from '@/context/PersonalDataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { ArrowLeft, PlusCircle, Trash2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { socialIconMap } from '@/lib/data';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

// Schemas for validation
const socialSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Name is required"),
  url: z.string().url("Must be a valid URL"),
});

const personalDataSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  title: z.string().min(1, 'Title is required'),
  avatarUrl: z.string().optional(),
  avatarHint: z.string().optional(),
  professionalSummary: z.string().min(1, 'Professional summary is required'),
  personalTouch: z.string().optional(),
  uniqueSellingPoint: z.string().optional(),
  contact: z.object({
    email: z.string().email('Invalid email address'),
    location: z.string().min(1, 'Location is required'),
  }),
  socials: z.array(socialSchema),
});

const projectSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  role: z.string().min(1, 'Role is required'),
  problem: z.string().min(1, 'Problem is required'),
  technologies: z.string().min(1, 'At least one technology is required'),
  imageUrl: z.string().min(1, 'Image is required'),
  imageHint: z.string().optional(),
  liveUrl: z.string().url().or(z.literal('')).optional(),
  githubUrl: z.string().url().or(z.literal('')).optional(),
});

const experienceSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  company: z.string().min(1, 'Company is required'),
  dates: z.string().min(1, 'Dates are required'),
  responsibilities: z.string().min(1, 'At least one responsibility is required'),
  technologies: z.string().min(1, 'At least one technology is required'),
});

const educationSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Degree/Title is required'),
  institution: z.string().min(1, 'Institution is required'),
  graduationDate: z.string().min(1, 'Graduation date is required'),
  honors: z.string().optional(),
});

const involvementSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Organization is required'),
  role: z.string().min(1, 'Role/Position is required'),
  dates: z.string().min(1, 'Dates are required'),
  description: z.string().min(1, 'Description is required'),
});

const gallerySchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  imageUrl: z.string().min(1, 'Image is required'),
  imageHint: z.string().optional(),
});

const publicationSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  journal: z.string().min(1, 'Journal is required'),
  date: z.string().min(1, 'Date is required'),
  summary: z.string().min(1, 'Summary is required'),
  imageUrl: z.string().min(1, 'Image is required'),
  imageHint: z.string().optional(),
  url: z.string().url().or(z.literal('')).optional(),
});

const skillsSchema = z.object({
    technical: z.array(z.object({
        id: z.string(),
        category: z.string().min(1, "Category is required"),
        skills: z.string().min(1, "At least one skill is required"),
    })),
    soft: z.array(z.object({
        id: z.string(),
        skill: z.string().min(1, "Skill is required"),
    }))
});

type ProjectFormValues = z.infer<typeof projectSchema>;
type ExperienceFormValues = z.infer<typeof experienceSchema>;
type EducationFormValues = z.infer<typeof educationSchema>;
type InvolvementFormValues = z.infer<typeof involvementSchema>;
type GalleryFormValues = z.infer<typeof gallerySchema>;
type PublicationFormValues = z.infer<typeof publicationSchema>;


// Generic Manager Component
function CrudManager<T extends { id: string, title: string }>({
  items,
  onUpdate,
  FormComponent,
  itemName,
}: {
  items: T[],
  onUpdate: (items: T[]) => void,
  FormComponent: React.FC<{ item: T | null, onSave: (item: T) => void, onOpenChange: (open: boolean) => void }>,
  itemName: string
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<T | null>(null);

  const handleAddNew = () => {
    setEditingItem(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (item: T) => {
    setEditingItem(item);
    setIsDialogOpen(true);
  };

  const handleDelete = (itemId: string) => {
    if (confirm(`Are you sure you want to delete this ${itemName}?`)) {
      onUpdate(items.filter(item => item.id !== itemId));
    }
  };

  const handleSave = (itemData: T) => {
    let newItems;
    if (itemData.id && items.find(i => i.id === itemData.id)) {
      newItems = items.map(item => item.id === itemData.id ? itemData : item);
    } else {
      newItems = [...items, { ...itemData, id: crypto.randomUUID() }];
    }
    onUpdate(newItems);
    setIsDialogOpen(false);
  };
  
  return (
    <CardContent>
      <Button onClick={handleAddNew} className="mb-4">
        <PlusCircle className="mr-2 h-4 w-4" /> Add New {itemName}
      </Button>
      <div className="space-y-4">
        {items.map(item => (
          <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
            <span className="font-medium text-sm md:text-base break-all">{item.title}</span>
            <div className="space-x-2 flex-shrink-0 ml-2">
              <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>Edit</Button>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)}>Delete</Button>
            </div>
          </div>
        ))}
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <FormComponent item={editingItem} onSave={handleSave} onOpenChange={setIsDialogOpen} />
      </Dialog>
    </CardContent>
  );
}


function PersonalDetailsForm() {
    const { personalData, setPersonalData } = usePersonalData();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof personalDataSchema>>({
        resolver: zodResolver(personalDataSchema),
        defaultValues: personalData.details,
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "socials",
    });

    useEffect(() => {
        form.reset(personalData.details);
    }, [personalData, form]);

    const onSubmit = (data: z.infer<typeof personalDataSchema>) => {
        setPersonalData({ ...personalData, details: data });
        toast({
            title: 'Success!',
            description: 'Your personal details have been updated.',
        });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField control={form.control} name="name" render={({ field }) => (<FormItem><FormLabel>Full Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="title" render={({ field }) => (<FormItem><FormLabel>Title / Role</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                
                <FormItem>
                    <FormLabel>Profile Photo</FormLabel>
                    <FormControl>
                        <Input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, form.setValue, 'avatarUrl')} />
                    </FormControl>
                    <FormMessage />
                    {form.watch('avatarUrl') && <img src={form.watch('avatarUrl')} alt="Avatar Preview" className="mt-2 rounded-full w-32 h-32 object-cover" />}
                </FormItem>
                <FormField control={form.control} name="avatarHint" render={({ field }) => (<FormItem><FormLabel>Profile Photo AI Hint</FormLabel><FormControl><Input {...field} placeholder="e.g. professional portrait"/></FormControl><FormMessage /></FormItem>)} />

                <FormField control={form.control} name="professionalSummary" render={({ field }) => (<FormItem><FormLabel>Professional Summary</FormLabel><FormControl><Textarea rows={4} {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="personalTouch" render={({ field }) => (<FormItem><FormLabel>Personal Touch</FormLabel><FormControl><Textarea rows={3} {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="uniqueSellingPoint" render={({ field }) => (<FormItem><FormLabel>Unique Selling Point</FormLabel><FormControl><Textarea rows={3} {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="contact.email" render={({ field }) => (<FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>)} />
                <FormField control={form.control} name="contact.location" render={({ field }) => (<FormItem><FormLabel>Location</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />

                <div>
                    <Label className="text-lg font-semibold">Social Links</Label>
                    <div className="space-y-4 mt-2">
                        {fields.map((field, index) => (
                            <div key={field.id} className="flex flex-col md:flex-row items-stretch md:items-end gap-2 p-3 border rounded-lg">
                                <FormField control={form.control} name={`socials.${index}.name`} render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Platform</FormLabel>
                                        <FormControl><Input {...field} placeholder="e.g. GitHub" /></FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name={`socials.${index}.url`} render={({ field }) => (<FormItem className="flex-1"><FormLabel>URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>)} />
                                <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)} className="flex-shrink-0"><Trash2 className="h-4 w-4" /></Button>
                            </div>
                        ))}
                         <Button type="button" variant="outline" size="sm" onClick={() => append({ id: crypto.randomUUID(), name: 'GitHub', url: '' })}>
                            <PlusCircle className="mr-2 h-4 w-4" /> Add Social
                        </Button>
                    </div>
                </div>

                <CardFooter className="px-0 pt-6">
                    <Button type="submit">Save Personal Details</Button>
                </CardFooter>
            </form>
        </Form>
    );
}

const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setValue: (key: any, value: any) => void, fieldName: 'imageUrl' | 'avatarUrl') => {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setValue(fieldName, reader.result as string);
        };
        reader.readAsDataURL(file);
    }
};

function ProjectForm({ item, onSave }: { item: ProjectFormValues | null, onSave: (data: ProjectFormValues) => void }) {
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: item ? { ...item, technologies: Array.isArray(item.technologies) ? item.technologies.join(', ') : item.technologies } : { id: '', title: '', role: '', problem: '', technologies: '', imageUrl: '', liveUrl: '', githubUrl: '' },
  });

  useEffect(() => {
    const defaultValues = item ? { ...item, technologies: Array.isArray(item.technologies) ? item.technologies.join(', ') : item.technologies } : { id: '', title: '', role: '', problem: '', technologies: '', imageUrl: '', liveUrl: '', githubUrl: '' };
    form.reset(defaultValues);
  }, [item, form]);

  const onSubmit = (data: ProjectFormValues) => onSave(data);
  
  return (
    <DialogContent className="sm:max-w-[600px] grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh]">
      <DialogHeader className="p-6 pb-0"><DialogTitle>{item ? 'Edit' : 'Add'} Project</DialogTitle></DialogHeader>
      <ScrollArea className="overflow-y-auto">
        <div className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField control={form.control} name="title" render={({ field }) => <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
              <FormField control={form.control} name="role" render={({ field }) => <FormItem><FormLabel>Role</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
              <FormField control={form.control} name="problem" render={({ field }) => <FormItem><FormLabel>Problem</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>} />
              <FormField control={form.control} name="technologies" render={({ field }) => <FormItem><FormLabel>Technologies (comma-separated)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
              <FormField control={form.control} name="liveUrl" render={({ field }) => <FormItem><FormLabel>Live URL (Optional)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
              <FormField control={form.control} name="githubUrl" render={({ field }) => <FormItem><FormLabel>GitHub URL (Optional)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
              <FormItem><FormLabel>Image</FormLabel><FormControl><Input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, form.setValue, 'imageUrl')} /></FormControl><FormMessage />
                {form.watch('imageUrl') && <img src={form.watch('imageUrl')} alt="Preview" className="mt-2 rounded-md max-h-40" />}
              </FormItem>
            </form>
          </Form>
        </div>
      </ScrollArea>
      <DialogFooter className="p-6 pt-0 border-t">
          <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
          <Button type="button" onClick={form.handleSubmit(onSubmit)}>Save</Button>
      </DialogFooter>
    </DialogContent>
  );
}

function ExperienceForm({ item, onSave }: { item: ExperienceFormValues | null, onSave: (data: ExperienceFormValues) => void }) {
  const form = useForm<ExperienceFormValues>({
    resolver: zodResolver(experienceSchema),
    defaultValues: item ? { ...item, technologies: Array.isArray(item.technologies) ? item.technologies.join(', ') : item.technologies, responsibilities: Array.isArray(item.responsibilities) ? item.responsibilities.join('\n') : item.responsibilities } : { id: '', title: '', company: '', dates: '', responsibilities: '', technologies: '' },
  });

   useEffect(() => {
    const defaultValues = item ? { ...item, technologies: Array.isArray(item.technologies) ? item.technologies.join(', ') : item.technologies, responsibilities: Array.isArray(item.responsibilities) ? item.responsibilities.join('\n') : item.responsibilities } : { id: '', title: '', company: '', dates: '', responsibilities: '', technologies: '' };
    form.reset(defaultValues);
  }, [item, form]);

  const onSubmit = (data: ExperienceFormValues) => onSave(data);

  return (
    <DialogContent className="sm:max-w-[600px] grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh]">
      <DialogHeader className="p-6 pb-0"><DialogTitle>{item ? 'Edit' : 'Add'} Experience</DialogTitle></DialogHeader>
      <ScrollArea className="overflow-y-auto">
        <div className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField control={form.control} name="title" render={({ field }) => <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
              <FormField control={form.control} name="company" render={({ field }) => <FormItem><FormLabel>Company</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
              <FormField control={form.control} name="dates" render={({ field }) => <FormItem><FormLabel>Dates</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
              <FormField control={form.control} name="responsibilities" render={({ field }) => <FormItem><FormLabel>Responsibilities (one per line)</FormLabel><FormControl><Textarea rows={5} {...field} /></FormControl><FormMessage /></FormItem>} />
              <FormField control={form.control} name="technologies" render={({ field }) => <FormItem><FormLabel>Technologies (comma-separated)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
            </form>
          </Form>
        </div>
      </ScrollArea>
      <DialogFooter className="p-6 pt-0 border-t">
        <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
        <Button type="button" onClick={form.handleSubmit(onSubmit)}>Save</Button>
      </DialogFooter>
    </DialogContent>
  );
}

function EducationForm({ item, onSave }: { item: EducationFormValues | null, onSave: (data: EducationFormValues) => void }) {
  const form = useForm<EducationFormValues>({
    resolver: zodResolver(educationSchema),
    defaultValues: item || { id: '', title: '', institution: '', graduationDate: '', honors: '' },
  });
  
  useEffect(() => {
      form.reset(item || { id: '', title: '', institution: '', graduationDate: '', honors: '' });
  }, [item, form]);

  const onSubmit = (data: EducationFormValues) => onSave(data);

  return (
    <DialogContent className="sm:max-w-[600px] grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh]">
      <DialogHeader className="p-6 pb-0"><DialogTitle>{item ? 'Edit' : 'Add'} Education</DialogTitle></DialogHeader>
      <ScrollArea className="overflow-y-auto">
        <div className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField control={form.control} name="title" render={({ field }) => <FormItem><FormLabel>Degree / Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
              <FormField control={form.control} name="institution" render={({ field }) => <FormItem><FormLabel>Institution</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
              <FormField control={form.control} name="graduationDate" render={({ field }) => <FormItem><FormLabel>Graduation Date</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
              <FormField control={form.control} name="honors" render={({ field }) => <FormItem><FormLabel>Honors (Optional)</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
            </form>
          </Form>
        </div>
      </ScrollArea>
      <DialogFooter className="p-6 pt-0 border-t">
        <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
        <Button type="button" onClick={form.handleSubmit(onSubmit)}>Save</Button>
      </DialogFooter>
    </DialogContent>
  );
}

function InvolvementForm({ item, onSave }: { item: InvolvementFormValues | null, onSave: (data: InvolvementFormValues) => void }) {
  const form = useForm<InvolvementFormValues>({
    resolver: zodResolver(involvementSchema),
    defaultValues: item || { id: '', title: '', role: '', dates: '', description: '' },
  });

  useEffect(() => {
    form.reset(item || { id: '', title: '', role: '', dates: '', description: '' });
  }, [item, form]);

  const onSubmit = (data: InvolvementFormValues) => onSave(data);

  return (
    <DialogContent className="sm:max-w-[600px] grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh]">
      <DialogHeader className="p-6 pb-0"><DialogTitle>{item ? 'Edit' : 'Add'} Involvement</DialogTitle></DialogHeader>
      <ScrollArea className="overflow-y-auto">
        <div className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField control={form.control} name="title" render={({ field }) => <FormItem><FormLabel>Organization / Club</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
              <FormField control={form.control} name="role" render={({ field }) => <FormItem><FormLabel>Role / Position</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
              <FormField control={form.control} name="dates" render={({ field }) => <FormItem><FormLabel>Dates</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
              <FormField control={form.control} name="description" render={({ field }) => <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>} />
            </form>
          </Form>
        </div>
      </ScrollArea>
      <DialogFooter className="p-6 pt-0 border-t">
        <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
        <Button type="button" onClick={form.handleSubmit(onSubmit)}>Save</Button>
      </DialogFooter>
    </DialogContent>
  );
}

function GalleryForm({ item, onSave }: { item: GalleryFormValues | null, onSave: (data: GalleryFormValues) => void }) {
  const form = useForm<GalleryFormValues>({
    resolver: zodResolver(gallerySchema),
    defaultValues: item || { id: '', title: '', description: '', imageUrl: '' },
  });

  useEffect(() => {
    form.reset(item || { id: '', title: '', description: '', imageUrl: '' });
  }, [item, form]);
  
  const onSubmit = (data: GalleryFormValues) => onSave(data);

  return (
    <DialogContent className="sm:max-w-[600px] grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh]">
      <DialogHeader className="p-6 pb-0"><DialogTitle>{item ? 'Edit' : 'Add'} Gallery Item</DialogTitle></DialogHeader>
      <ScrollArea className="overflow-y-auto">
        <div className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField control={form.control} name="title" render={({ field }) => <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
              <FormField control={form.control} name="description" render={({ field }) => <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>} />
              <FormItem><FormLabel>Image</FormLabel><FormControl><Input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, form.setValue, 'imageUrl')} /></FormControl><FormMessage />
                  {form.watch('imageUrl') && <img src={form.watch('imageUrl')} alt="Preview" className="mt-2 rounded-md max-h-40" />}
              </FormItem>
            </form>
          </Form>
        </div>
      </ScrollArea>
      <DialogFooter className="p-6 pt-0 border-t">
        <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
        <Button type="button" onClick={form.handleSubmit(onSubmit)}>Save</Button>
      </DialogFooter>
    </DialogContent>
  );
}

function PublicationForm({ item, onSave }: { item: PublicationFormValues | null, onSave: (data: PublicationFormValues) => void }) {
  const form = useForm<PublicationFormValues>({
    resolver: zodResolver(publicationSchema),
    defaultValues: item || { id: '', title: '', journal: '', date: '', summary: '', imageUrl: '', url: '' },
  });

  useEffect(() => {
    form.reset(item || { id: '', title: '', journal: '', date: '', summary: '', imageUrl: '', url: '' });
  }, [item, form]);

  const onSubmit = (data: PublicationFormValues) => onSave(data);

  return (
     <DialogContent className="sm:max-w-[600px] grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh]">
      <DialogHeader className="p-6 pb-0"><DialogTitle>{item ? 'Edit' : 'Add'} Publication</DialogTitle></DialogHeader>
      <ScrollArea className="overflow-y-auto">
        <div className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField control={form.control} name="title" render={({ field }) => <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
              <FormField control={form.control} name="journal" render={({ field }) => <FormItem><FormLabel>Journal</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
              <FormField control={form.control} name="date" render={({ field }) => <FormItem><FormLabel>Date</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
              <FormField control={form.control} name="summary" render={({ field }) => <FormItem><FormLabel>Summary</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>} />
              <FormField control={form.control} name="url" render={({ field }) => <FormItem><FormLabel>URL</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
              <FormItem><FormLabel>Image</FormLabel><FormControl><Input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, form.setValue, 'imageUrl')} /></FormControl><FormMessage />
                  {form.watch('imageUrl') && <img src={form.watch('imageUrl')} alt="Preview" className="mt-2 rounded-md max-h-40" />}
              </FormItem>
            </form>
          </Form>
        </div>
      </ScrollArea>
      <DialogFooter className="p-6 pt-0 border-t">
        <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
        <Button type="button" onClick={form.handleSubmit(onSubmit)}>Save</Button>
      </DialogFooter>
    </DialogContent>
  );
}


function SkillsForm() {
    const { personalData, setPersonalData } = usePersonalData();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof skillsSchema>>({
        resolver: zodResolver(skillsSchema),
        defaultValues: {
            technical: personalData.skills.technical.map(t => ({...t, skills: t.skills.join(', ')})),
            soft: personalData.skills.soft
        },
    });

    const { fields: techFields, append: appendTech, remove: removeTech } = useFieldArray({ control: form.control, name: "technical" });
    const { fields: softFields, append: appendSoft, remove: removeSoft } = useFieldArray({ control: form.control, name: "soft" });

    useEffect(() => {
        form.reset({
            technical: personalData.skills.technical.map(t => ({...t, skills: t.skills.join(', ')})),
            soft: personalData.skills.soft
        });
    }, [personalData, form]);

    const onSubmit = (data: z.infer<typeof skillsSchema>) => {
        const newSkills = {
            technical: data.technical.map(t => ({...t, skills: t.skills.split(',').map(s => s.trim())})),
            soft: data.soft
        }
        setPersonalData({ ...personalData, skills: newSkills });
        toast({ title: 'Success!', description: 'Your skills have been updated.' });
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div>
                    <h3 className="text-lg font-semibold mb-4">Technical Skills</h3>
                    <div className="space-y-4">
                        {techFields.map((field, index) => (
                            <div key={field.id} className="flex flex-col gap-2 p-4 border rounded-lg">
                                <FormField control={form.control} name={`technical.${index}.category`} render={({ field }) => <FormItem><FormLabel>Category</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
                                <FormField control={form.control} name={`technical.${index}.skills`} render={({ field }) => <FormItem><FormLabel>Skills (comma-separated)</FormLabel><FormControl><Textarea {...field} /></FormControl><FormMessage /></FormItem>} />
                                <Button type="button" variant="destructive" size="sm" onClick={() => removeTech(index)} className="self-end"><Trash2 className="mr-2 h-4 w-4" /> Remove Category</Button>
                            </div>
                        ))}
                        <Button type="button" variant="outline" size="sm" onClick={() => appendTech({ id: crypto.randomUUID(), category: '', skills: '' })}><PlusCircle className="mr-2 h-4 w-4" /> Add Technical Skill Category</Button>
                    </div>
                </div>

                 <div>
                    <h3 className="text-lg font-semibold mb-4">Soft Skills</h3>
                    <div className="space-y-4">
                        {softFields.map((field, index) => (
                            <div key={field.id} className="flex items-center gap-2 p-3 border rounded-lg">
                                <FormField control={form.control} name={`soft.${index}.skill`} render={({ field }) => <FormItem className="flex-1"><FormLabel>Skill</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>} />
                                <Button type="button" variant="destructive" size="icon" onClick={() => removeSoft(index)}><Trash2 className="h-4 w-4" /></Button>
                            </div>
                        ))}
                        <Button type="button" variant="outline" size="sm" onClick={() => appendSoft({ id: crypto.randomUUID(), skill: '' })}><PlusCircle className="mr-2 h-4 w-4" /> Add Soft Skill</Button>
                    </div>
                </div>

                <CardFooter className="px-0 pt-6"><Button type="submit">Save Skills</Button></CardFooter>
            </form>
        </Form>
    )
}

export default function AdminPage() {
    const { personalData, setPersonalData } = usePersonalData();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const { toast } = useToast();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        if (sessionStorage.getItem('isAdminAuthenticated') === 'true') {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // IMPORTANT: This is a simple client-side check and is not secure for production.
        if (password === (process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'deeksha')) {
            setIsAuthenticated(true);
            sessionStorage.setItem('isAdminAuthenticated', 'true');
            toast({ title: "Login Successful", description: "Welcome!" });
        } else {
            toast({
                variant: 'destructive',
                title: "Login Failed",
                description: "Incorrect password. Please try again.",
            });
            setPassword('');
        }
    };
    
    const handleLogout = () => {
        sessionStorage.removeItem('isAdminAuthenticated');
        setIsAuthenticated(false);
        toast({ title: "Logged Out", description: "You have been successfully logged out." });
    };

    const handleProjectUpdate = (projects: any[]) => {
        const processedProjects = projects.map(p => ({ ...p, technologies: typeof p.technologies === 'string' ? p.technologies.split(',').map(t => t.trim()) : p.technologies }));
        setPersonalData({ ...personalData, projects: processedProjects });
    }

    const handleExperienceUpdate = (experience: any[]) => {
        const processedExperience = experience.map(e => ({ ...e, 
            technologies: typeof e.technologies === 'string' ? e.technologies.split(',').map(t => t.trim()) : e.technologies,
            responsibilities: typeof e.responsibilities === 'string' ? e.responsibilities.split('\n').map(r => r.trim()).filter(r => r) : e.responsibilities
        }));
        setPersonalData({ ...personalData, experience: processedExperience });
    };

    const handleEducationUpdate = (education: any[]) => {
        setPersonalData({ ...personalData, education });
    };

    const handleInvolvementUpdate = (involvement: any[]) => {
        setPersonalData({ ...personalData, involvement });
    };

    const handleGalleryUpdate = (gallery: any[]) => {
        setPersonalData({ ...personalData, gallery });
    };
    
    const handlePublicationUpdate = (publications: any[]) => {
        setPersonalData({ ...personalData, publications });
    };

    if (!isClient) {
        return null;
    }

    if (!isAuthenticated) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background">
                <Card className="w-full max-w-sm mx-4">
                    <CardHeader>
                        <CardTitle className="text-2xl font-headline">Admin Login</CardTitle>
                        <CardDescription>Enter the password to access the admin dashboard.</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleLogin}>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input 
                                    id="password" 
                                    type="password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required 
                                    placeholder="********"
                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit" className="w-full">Login</Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-12 px-4 md:px-6">
            <div className="flex justify-between items-center mb-8">
                 <Button variant="ghost" asChild>
                    <Link href="/"><ArrowLeft className="mr-2 h-4 w-4" />Back to Portfolio</Link>
                </Button>
                <Button variant="outline" onClick={handleLogout}>Logout</Button>
            </div>
            <Tabs defaultValue="personal" className="w-full">
                <ScrollArea className="w-full pb-4">
                  <TabsList className="grid w-max grid-flow-col gap-4">
                      <TabsTrigger value="personal">Personal</TabsTrigger>
                      <TabsTrigger value="projects">Projects</TabsTrigger>
                      <TabsTrigger value="skills">Skills</TabsTrigger>
                      <TabsTrigger value="experience">Experience</TabsTrigger>
                      <TabsTrigger value="education">Education</TabsTrigger>
                      <TabsTrigger value="involvement">Involvement</TabsTrigger>
                      <TabsTrigger value="gallery">Gallery</TabsTrigger>
                      <TabsTrigger value="publications">Publications</TabsTrigger>
                  </TabsList>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>

                <TabsContent value="personal"><Card><CardHeader><CardTitle>Personal Details</CardTitle><CardDescription>Update your personal and contact information.</CardDescription></CardHeader><CardContent><PersonalDetailsForm /></CardContent></Card></TabsContent>
                
                <TabsContent value="projects"><Card><CardHeader><CardTitle>Projects</CardTitle><CardDescription>Manage your project entries.</CardDescription></CardHeader>
                    <CrudManager items={personalData.projects} onUpdate={handleProjectUpdate} FormComponent={ProjectForm as any} itemName="Project" />
                </Card></TabsContent>
                
                <TabsContent value="skills"><Card><CardHeader><CardTitle>Skills</CardTitle><CardDescription>Manage your technical and soft skills.</CardDescription></CardHeader>
                    <CardContent><SkillsForm /></CardContent>
                </Card></TabsContent>

                <TabsContent value="experience"><Card><CardHeader><CardTitle>Experience</CardTitle><CardDescription>Manage your work experience.</CardDescription></CardHeader>
                    <CrudManager items={personalData.experience} onUpdate={handleExperienceUpdate} FormComponent={ExperienceForm as any} itemName="Experience" />
                </Card></TabsContent>

                <TabsContent value="education"><Card><CardHeader><CardTitle>Education</CardTitle><CardDescription>Manage your qualifications.</CardDescription></CardHeader>
                    <CrudManager items={personalData.education} onUpdate={handleEducationUpdate} FormComponent={EducationForm as any} itemName="Education" />
                </Card></TabsContent>

                <TabsContent value="involvement"><Card><CardHeader><CardTitle>Organizations & Involvement</CardTitle><CardDescription>Manage your campus and technical organization involvement.</CardDescription></CardHeader>
                    <CrudManager items={personalData.involvement} onUpdate={handleInvolvementUpdate} FormComponent={InvolvementForm as any} itemName="Involvement" />
                </Card></TabsContent>

                <TabsContent value="gallery"><Card><CardHeader><CardTitle>Gallery</CardTitle><CardDescription>Manage your gallery of achievements and certificates.</CardDescription></CardHeader>
                    <CrudManager items={personalData.gallery} onUpdate={handleGalleryUpdate} FormComponent={GalleryForm as any} itemName="Gallery Item" />
                </Card></TabsContent>

                <TabsContent value="publications"><Card><CardHeader><CardTitle>Publications</CardTitle><CardDescription>Manage your published articles.</CardDescription></CardHeader>
                    <CrudManager items={personalData.publications} onUpdate={handlePublicationUpdate} FormComponent={PublicationForm as any} itemName="Publication" />
                </Card></TabsContent>
            </Tabs>
        </div>
    );
}
