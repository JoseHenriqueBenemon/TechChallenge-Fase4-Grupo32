export interface IPost {
    id?: number;
    user_id: number;
    title: string;
    description: string;
    category_subject:
      | 'Math'
      | 'Biology'
      | 'Physics'
      | 'Chemistry'
      | 'History'
      | 'Geography'
      | 'Portuguese'
      | 'English'
      | 'Literature'
      | 'Physical Education'
      | 'Arts'
      | 'Sociology'
      | 'Philosophy';
    status: 'Active' | 'Inactive';
    limit_date: Date | string;
    created_at?: Date;
    updated_at?: Date;
    user?: Partial<IUser>;
  }

export interface IUser {
    id?: number | undefined;
    name: string;
    email: string;
    password: string;
    role: 'Student' | 'Teacher';
    registration_number?: string | undefined;
    department?: string | undefined;
    posts?: IPost[]
}