# Loading System Documentation

## Overview

The Donare platform now includes a comprehensive loading system that provides smooth user experiences across all pages and interactions. The system includes multiple loading states, animations, and skeleton components.

## Components

### 1. Global Loading Component (`components/ui/global-loading.tsx`)

The main loading component with three variants:

- **Default**: Full-screen overlay with backdrop blur
- **Minimal**: Small loading indicator in top-right corner
- **Fullscreen**: Full-screen loading with branding

```tsx
<GlobalLoading 
  isLoading={true} 
  message="Loading page..."
  variant="default"
/>
```

### 2. Loading Context (`hooks/use-loading.tsx`)

React context for managing global loading states:

```tsx
const { showLoading, hideLoading, isLoading, loadingMessage } = useLoading();

// Show loading
showLoading('Processing request...');

// Hide loading
hideLoading();
```

### 3. Route Loading (`components/loading/route-loading.tsx`)

Automatic loading states for route transitions:

- Detects route changes
- Shows loading overlay during navigation
- Automatically hides after transition

### 4. Loading Wrapper (`components/loading/loading-wrapper.tsx`)

Higher-order component for wrapping pages with loading functionality:

```tsx
<LoadingWrapper 
  loading={isLoading} 
  loadingMessage="Loading content..."
  showSkeleton={true}
>
  <YourContent />
</LoadingWrapper>
```

### 5. Skeleton Components (`components/ui/loading-skeleton.tsx`)

Pre-built skeleton components for different content types:

- `LoadingSkeleton`: Basic skeleton with variants
- `CardSkeleton`: Card layout skeleton
- `HeroSkeleton`: Hero section skeleton
- `SectionSkeleton`: Section layout skeleton

## Implementation

### 1. Layout Integration

The loading system is integrated into the main layout (`app/layout.tsx`):

```tsx
<LoadingProvider>
  <AuthProvider>
    <ConditionalNavbar />
    <main role="main" className="flex-1">
      {children}
    </main>
    <ConditionalFooter />
    <RouteLoading />
    <Toaster />
  </AuthProvider>
</LoadingProvider>
```

### 2. Next.js App Router Integration

Loading states are automatically handled through Next.js loading.tsx files:

- `app/loading.tsx`: Global loading fallback
- `app/admin/loading.tsx`: Admin-specific loading
- `app/volunteer/loading.tsx`: Volunteer portal loading

### 3. Page-Level Loading

Individual pages can implement loading states:

```tsx
export default function MyPage() {
  const [isLoading, setIsLoading] = useState(true);
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    showLoading('Loading data...');
    // Simulate API call
    setTimeout(() => {
      hideLoading();
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return <PageLoadingSkeleton />;
  }

  return <div>Your content</div>;
}
```

## Loading States

### 1. Page Transitions

- **Route Changes**: Automatic loading overlay during navigation
- **Initial Load**: Page skeleton while content loads
- **Data Fetching**: Skeleton placeholders for dynamic content

### 2. User Interactions

- **Form Submissions**: Loading states during form processing
- **API Calls**: Loading indicators for async operations
- **File Uploads**: Progress indicators for file operations

### 3. Authentication

- **Login/Logout**: Loading states during auth operations
- **Token Validation**: Loading while checking authentication
- **Session Management**: Loading during session updates

## Animation System

### 1. CSS Animations

The system includes custom CSS animations in `globals.css`:

```css
@keyframes shimmer {
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
  background-size: 200px 100%;
}
```

### 2. Framer Motion Integration

Smooth transitions using Framer Motion:

```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.9 }}
  transition={{ duration: 0.2 }}
>
  <Content />
</motion.div>
```

## Usage Examples

### 1. Basic Loading State

```tsx
import { useLoading } from '@/hooks/use-loading';

function MyComponent() {
  const { showLoading, hideLoading } = useLoading();

  const handleSubmit = async () => {
    showLoading('Submitting form...');
    try {
      await submitForm();
    } finally {
      hideLoading();
    }
  };
}
```

### 2. Skeleton Loading

```tsx
import { LoadingSkeleton, CardSkeleton } from '@/components/ui/loading-skeleton';

function DataList({ isLoading, data }) {
  if (isLoading) {
    return (
      <div className="grid gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {data.map(item => (
        <DataCard key={item.id} data={item} />
      ))}
    </div>
  );
}
```

### 3. Page-Level Loading

```tsx
import { LoadingWrapper } from '@/components/loading/loading-wrapper';

export default function MyPage() {
  return (
    <LoadingWrapper 
      loading={isLoading} 
      loadingMessage="Loading page..."
      showSkeleton={true}
    >
      <PageContent />
    </LoadingWrapper>
  );
}
```

## Best Practices

### 1. Loading Duration

- **Quick Operations**: Use minimal loading (300-500ms)
- **API Calls**: Show loading for duration of request
- **Page Transitions**: Show loading for 200-300ms minimum

### 2. User Feedback

- **Clear Messages**: Provide descriptive loading messages
- **Progress Indication**: Show progress for long operations
- **Error Handling**: Handle loading errors gracefully

### 3. Performance

- **Skeleton Loading**: Use skeletons for better perceived performance
- **Lazy Loading**: Implement lazy loading for heavy components
- **Optimistic Updates**: Update UI optimistically when possible

## Testing

### Demo Page

Visit `/loading-demo` to test all loading states:

- Global loading overlays
- Skeleton loading states
- Page skeleton layouts
- Context-based loading

### Manual Testing

1. Navigate between pages to see route loading
2. Submit forms to see interaction loading
3. Load data-heavy pages to see skeleton loading
4. Test on slow connections for realistic loading times

## Customization

### 1. Custom Loading Messages

```tsx
showLoading('Custom loading message...');
```

### 2. Custom Loading Variants

```tsx
<GlobalLoading 
  isLoading={true} 
  message="Loading..."
  variant="minimal"
  className="custom-class"
/>
```

### 3. Custom Skeleton Components

```tsx
<LoadingSkeleton 
  variant="card" 
  className="w-full h-48"
  lines={3}
/>
```

## Troubleshooting

### Common Issues

1. **Loading Not Showing**: Ensure LoadingProvider is wrapped around components
2. **Loading Not Hiding**: Check that hideLoading() is called in all code paths
3. **Performance Issues**: Use skeleton loading instead of full overlays for heavy operations

### Debug Mode

Enable debug logging by setting `NODE_ENV=development` to see loading state changes in console.

## Future Enhancements

1. **Progress Bars**: Add progress indicators for long operations
2. **Loading Analytics**: Track loading performance metrics
3. **Smart Loading**: Adaptive loading based on connection speed
4. **Offline Loading**: Handle loading states for offline scenarios
