
/**
 * Componente para exibir o painel de informações detalhadas de um equipamento selecionado.
 * Renderiza apenas se um único equipamento estiver selecionado na cena 3D.
 *
 * Responsabilidades:
 * - Exibir os atributos do equipamento (nome, TAG, tipo, sistema, área, detalhes).
 * - Permitir a alteração do estado operacional do equipamento através de um dropdown.
 * - Permitir a alteração do produto associado ao equipamento através de um dropdown.
 * - Gerenciar a exibição e interação com anotações:
 *   - Exibir o texto e a data da anotação existente.
 *   - Fornecer botões para adicionar, editar ou excluir a anotação.
 * - Fornecer um botão para fechar o painel de informações (desselecionando o equipamento).
 *
 * ```mermaid
 * classDiagram
 *   InfoPanelProps <|-- InfoPanel
 *   InfoPanelProps : +equipment: Equipment | null
 *   InfoPanelProps : +annotation: Annotation | null
 *   InfoPanelProps : +onClose: () -> void
 *   InfoPanelProps : +onOpenAnnotationDialog: () -> void
 *   InfoPanelProps : +onDeleteAnnotation: (equipmentTag: string) -> void
 *   InfoPanelProps : +onOperationalStateChange: (equipmentTag: string, newState: string) -> void
 *   InfoPanelProps : +availableOperationalStatesList: string[]
 *   InfoPanelProps : +onProductChange: (equipmentTag: string, newProduct: string) -> void
 *   InfoPanelProps : +availableProductsList: string[]
 *   InfoPanel ..> Equipment : uses
 *   InfoPanel ..> Annotation : uses
 * ```
 */
"use client";

import type { Equipment, Annotation } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { XIcon, InfoIcon, TagIcon, LocateIcon, ActivityIcon, FileTextIcon, Settings2Icon, MessageSquarePlusIcon, Edit3Icon, Trash2Icon, CalendarDays, PackageIcon } from 'lucide-react';
import { format, parseISO } from 'date-fns';

/**
 * Props para o componente InfoPanel.
 */
interface InfoPanelProps {
  /** O equipamento selecionado para exibir detalhes. Null se nenhum equipamento único estiver selecionado. */
  equipment: Equipment | null;
  /** A anotação associada ao equipamento selecionado. Null se não houver anotação. */
  annotation: Annotation | null;
  /** Callback para fechar o painel de informações (geralmente deseleciona o equipamento). */
  onClose: () => void;
  /** Callback para abrir o diálogo de adição/edição de anotação. */
  onOpenAnnotationDialog: () => void;
  /** Callback para excluir a anotação do equipamento especificado. */
  onDeleteAnnotation: (equipmentTag: string) => void;
  /** Callback para alterar o estado operacional de um equipamento. */
  onOperationalStateChange: (equipmentTag: string, newState: string) => void;
  /** Lista de estados operacionais disponíveis para seleção no dropdown. */
  availableOperationalStatesList: string[];
  /** Callback para alterar o produto de um equipamento. */
  onProductChange: (equipmentTag: string, newProduct: string) => void;
  /** Lista de produtos disponíveis para seleção no dropdown. */
  availableProductsList: string[];
}

/**
 * Renderiza um painel flutuante com informações detalhadas sobre o equipamento selecionado.
 * Mostra detalhes apenas se um único equipamento estiver selecionado. Permite interações
 * como alterar estado operacional, produto e gerenciar anotações.
 * @param {InfoPanelProps} props As props do componente.
 * @returns {JSX.Element | null} O componente InfoPanel ou null se nenhum equipamento único estiver selecionado.
 */
export function InfoPanel({
  equipment,
  annotation,
  onClose,
  onOpenAnnotationDialog,
  onDeleteAnnotation,
  onOperationalStateChange,
  availableOperationalStatesList,
  onProductChange,
  availableProductsList
}: InfoPanelProps): JSX.Element | null {
  if (!equipment) return null;

  /**
   * Manipula o clique no botão de excluir anotação.
   */
  const handleDeleteClick = () => {
    if (equipment) {
      onDeleteAnnotation(equipment.tag);
    }
  };

  /**
   * Formata a data de criação/modificação da anotação para exibição.
   * @type {string | null}
   */
  const formattedDate = annotation?.createdAt ? format(parseISO(annotation.createdAt), "dd/MM/yyyy HH:mm") : null;

  return (
    <Card className="absolute top-4 right-4 w-80 shadow-xl z-20 bg-card/90 backdrop-blur-sm max-h-[calc(100vh-2rem)] flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg flex items-center">
          <InfoIcon className="mr-2 h-5 w-5 text-primary" />
          Detalhes
        </CardTitle>
        <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close info panel">
          <XIcon className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3 pb-3 overflow-y-auto flex-grow">
        <h3 className="text-md font-semibold">{equipment.name}</h3>
        <p className="text-sm">
          TAG: <span className="font-mono text-xs bg-muted px-1 py-0.5 rounded">{equipment.tag}</span>
        </p>
        <p className="text-sm">Tipo: {equipment.type}</p>

        {equipment.sistema && (
          <p className="text-sm flex items-center">
            <Settings2Icon className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
            Sistema: {equipment.sistema}
          </p>
        )}
        {equipment.area && (
          <p className="text-sm flex items-center">
            <LocateIcon className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
            Área: {equipment.area}
          </p>
        )}

        {equipment.product && (
          <div className="space-y-1 text-sm">
            <Label htmlFor={`product-select-${equipment.tag}`} className="flex items-center text-xs font-normal text-muted-foreground">
              <PackageIcon className="mr-1.5 h-3.5 w-3.5" />
              Produto:
            </Label>
            <Select
              value={equipment.product}
              onValueChange={(newProduct) => onProductChange(equipment.tag, newProduct)}
            >
              <SelectTrigger id={`product-select-${equipment.tag}`} className="h-8 text-xs">
                <SelectValue placeholder="Selecionar produto" />
              </SelectTrigger>
              <SelectContent>
                {availableProductsList.map(prod => (
                  <SelectItem key={prod} value={prod} className="text-xs">
                    {prod}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {equipment.operationalState && (
           <div className="space-y-1 text-sm">
            <Label htmlFor={`op-state-select-${equipment.tag}`} className="flex items-center text-xs font-normal text-muted-foreground">
              <ActivityIcon className="mr-1.5 h-3.5 w-3.5" />
              Estado Operacional:
            </Label>
            <Select
              value={equipment.operationalState}
              onValueChange={(newState) => onOperationalStateChange(equipment.tag, newState)}
              disabled={equipment.operationalState === "Não aplicável" && availableOperationalStatesList.filter(s => s !== "Não aplicável").length === 0}
            >
              <SelectTrigger id={`op-state-select-${equipment.tag}`} className="h-8 text-xs">
                <SelectValue placeholder="Selecionar estado" />
              </SelectTrigger>
              <SelectContent>
                {availableOperationalStatesList.map(state => (
                  <SelectItem key={state} value={state} className="text-xs">
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {equipment.details && (
          <div className="text-sm pt-2">
            <Label htmlFor={`details-text-${equipment.tag}`} className="flex items-center text-xs font-normal text-muted-foreground">
              <FileTextIcon className="mr-1.5 h-3.5 w-3.5" />
              Detalhes:
            </Label>
            <p id={`details-text-${equipment.tag}`} className="italic pl-5 text-xs">{equipment.details}</p>
          </div>
        )}
        <Separator className="my-3"/>
        {annotation ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium flex items-center"><Edit3Icon className="mr-2 h-4 w-4 text-primary"/>Anotação</h4>
                {formattedDate && (
                    <span className="text-xs text-muted-foreground flex items-center">
                        <CalendarDays className="mr-1 h-3 w-3" /> {formattedDate}
                    </span>
                )}
            </div>
            <p className="text-xs bg-muted/50 p-2 rounded whitespace-pre-wrap break-words">{annotation.text}</p>
            <div className="flex space-x-2 pt-1">
              <Button onClick={onOpenAnnotationDialog} size="sm" variant="outline" className="flex-1">
                <Edit3Icon className="mr-2 h-4 w-4" /> Editar
              </Button>
              <Button onClick={handleDeleteClick} size="sm" variant="destructive" className="flex-1">
                <Trash2Icon className="mr-2 h-4 w-4" /> Excluir
              </Button>
            </div>
          </div>
        ) : (
          <Button onClick={onOpenAnnotationDialog} size="sm" className="w-full">
            <MessageSquarePlusIcon className="mr-2 h-4 w-4" /> Adicionar Anotação
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
